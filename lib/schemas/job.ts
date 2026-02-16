import { z } from "zod";

export const createJobSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().optional(),
  salary: z.number().positive().optional(),
  jobUrl: z.string().url().optional().or(z.literal("")),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  appliedDate: z.string().optional(),
  columnId: z.string().min(1, "Column ID is required"),
  boardId: z.string().min(1, "Board ID is required"),
});

export const updateJobSchema = z.object({
  company: z.string().min(1, "Company name is required").optional(),
  position: z.string().min(1, "Position is required").optional(),
  location: z.string().optional(),
  salary: z.number().positive().optional(),
  jobUrl: z.string().url().optional().or(z.literal("")),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  appliedDate: z.string().optional(),
});

export const moveJobSchema = z.object({
  columnId: z.string().min(1, "Column ID is required"),
  order: z.number().int().min(0),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type MoveJobInput = z.infer<typeof moveJobSchema>;
