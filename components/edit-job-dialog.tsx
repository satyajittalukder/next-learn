"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateJobSchema, type UpdateJobInput } from "@/lib/schemas/job";
import { toast } from "sonner";
import { useState } from "react";

interface EditJobDialogProps {
  job: {
    _id: string;
    company: string;
    position: string;
    location?: string;
    salary?: number;
    jobUrl?: string;
    notes?: string;
    appliedDate?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const EditJobDialog = ({ job, open, onOpenChange, onSuccess }: EditJobDialogProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateJobInput>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      company: job.company,
      position: job.position,
      location: job.location || "",
      salary: job.salary,
      jobUrl: job.jobUrl || "",
      notes: job.notes || "",
      appliedDate: job.appliedDate ? new Date(job.appliedDate).toISOString().split("T")[0] : "",
    },
  });

  const onSubmit = async (data: UpdateJobInput) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/${job._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      toast.success("Job updated successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to update job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Job Application</DialogTitle>
          <DialogDescription>
            Update the details of your job application.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Company Name"
              />
              {errors.company && (
                <p className="text-xs text-destructive">{errors.company.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                {...register("position")}
                placeholder="Software Engineer"
              />
              {errors.position && (
                <p className="text-xs text-destructive">{errors.position.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="number"
                {...register("salary", { valueAsNumber: true })}
                placeholder="120000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobUrl">Job URL</Label>
            <Input
              id="jobUrl"
              type="url"
              {...register("jobUrl")}
              placeholder="https://example.com/job"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appliedDate">Applied Date</Label>
            <Input
              id="appliedDate"
              type="date"
              {...register("appliedDate")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              {...register("notes")}
              placeholder="Additional notes..."
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobDialog;
export { EditJobDialog };
