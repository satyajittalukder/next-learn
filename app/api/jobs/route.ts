import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { JobApplication, Column } from "@/lib/models";
import { createJobSchema } from "@/lib/schemas/job";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const columnId = searchParams.get("columnId");

    await connectDB();

    const query: any = { userId: session.user.id };
    if (columnId) {
      query.columnId = columnId;
    }

    const jobs = await JobApplication.find(query).sort({ order: 1 });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = createJobSchema.parse(body);

    await connectDB();

    // Get the column to determine the order
    const column = await Column.findById(validatedData.columnId);
    if (!column) {
      return NextResponse.json(
        { error: "Column not found" },
        { status: 404 }
      );
    }

    // Create the job application
    const jobApplication = await JobApplication.create({
      ...validatedData,
      userId: session.user.id,
      status: "applied",
      order: column.jobApplications.length, // Add to end of column
    });

    // Add job to column's jobApplications array
    column.jobApplications.push(jobApplication._id);
    await column.save();

    return NextResponse.json(jobApplication, { status: 201 });
  } catch (error: any) {
    console.error("Error creating job application:", error);

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
