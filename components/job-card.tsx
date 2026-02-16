"use client";

import { MoreVertical, Trash2, Edit, ExternalLink, MapPin, DollarSign, Calendar, GripVertical } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useState } from "react";
import EditJobDialog from "./edit-job-dialog";
import DeleteConfirmationDialog from "./delete-confirmation-dialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface JobCardProps {
  job: {
    _id: string;
    company: string;
    position: string;
    location?: string;
    salary?: number;
    jobUrl?: string;
    appliedDate?: string;
    notes?: string;
    tags?: string[];
    columnId: string;
    boardId: string;
  };
  onUpdate: () => void;
}

const JobCard = ({ job, onUpdate }: JobCardProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: job._id,
    data: {
      job,
      columnId: job.columnId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms ease',
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'default',
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className="group hover-lift bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden animate-scale-in"
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-purple-600 transition-all duration-200 opacity-60 group-hover:opacity-100 hover:scale-110"
              aria-label="Drag to reorder"
            >
              <GripVertical className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-base text-gray-900 truncate">
                    {job.company}
                  </h4>
                  <p className="text-sm text-gray-600 truncate">{job.position}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-50"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card border-0">
                    <DropdownMenuItem
                      onClick={() => setShowEditDialog(true)}
                      className="hover:bg-purple-50 cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {job.jobUrl && (
                      <DropdownMenuItem asChild>
                        <a
                          href={job.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:bg-blue-50 cursor-pointer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Job
                        </a>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-destructive hover:bg-red-50 cursor-pointer"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-1.5 text-xs text-gray-500">
                {job.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-purple-500" />
                    <span>{job.location}</span>
                  </div>
                )}
                {job.salary && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-green-500" />
                    <span className="font-medium">${job.salary.toLocaleString()}</span>
                  </div>
                )}
                {job.appliedDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" />
                    <span>{formatDate(job.appliedDate)}</span>
                  </div>
                )}
              </div>

              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs rounded-full font-medium hover:from-purple-200 hover:to-blue-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <EditJobDialog
        job={job}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSuccess={onUpdate}
      />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        jobId={job._id}
        jobTitle={`${job.position} at ${job.company}`}
        onSuccess={onUpdate}
      />
    </>
  );
};

export default JobCard;
