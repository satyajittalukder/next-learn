import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { JobApplication, Column } from "@/lib/models";
import { updateJobSchema } from "@/lib/schemas/job";

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
    const validatedData = updateJobSchema.parse(body);

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

    // Update the job
    Object.assign(job, validatedData);
    await job.save();

    return NextResponse.json(job);
  } catch (error: any) {
    console.error("Error updating job application:", error);

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

export async function DELETE(
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

    // Remove job from column's jobApplications array
    await Column.findByIdAndUpdate(job.columnId, {
      $pull: { jobApplications: job._id },
    });

    // Delete the job
    await JobApplication.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
