import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { JobApplication, Column } from "@/lib/models";
import { moveJobSchema } from "@/lib/schemas/job";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = moveJobSchema.parse(body);

    await connectDB();

    // Find the job and verify ownership
    const job = await JobApplication.findById(id);
    if (!job) {
      return NextResponse.json(
        { error: "Job application not found" },
        { status: 404 }
      );
    }

    if (job.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const oldColumnId = job.columnId;
    const newColumnId = validatedData.columnId;

    // If moving to a different column
    if (oldColumnId !== newColumnId) {
      // Remove from old column
      await Column.findByIdAndUpdate(oldColumnId, {
        $pull: { jobApplications: job._id },
      });

      // Add to new column
      await Column.findByIdAndUpdate(newColumnId, {
        $push: { jobApplications: job._id },
      });

      // Update job's columnId
      job.columnId = newColumnId;
    }

    // Update job's order
    job.order = validatedData.order;
    await job.save();

    // Reorder other jobs in the destination column
    const jobsInColumn = await JobApplication.find({
      columnId: newColumnId,
      _id: { $ne: job._id },
    }).sort({ order: 1 });

    // Update order for jobs that need to shift
    for (let i = 0; i < jobsInColumn.length; i++) {
      const currentJob = jobsInColumn[i];
      const newOrder = i >= validatedData.order ? i + 1 : i;

      if (currentJob.order !== newOrder) {
        currentJob.order = newOrder;
        await currentJob.save();
      }
    }

    return NextResponse.json(job);
  } catch (error: any) {
    console.error("Error moving job application:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
