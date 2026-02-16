"use client";
import { Board, Column } from '@/lib/models/model.type';
import { Award, Calendar, CheckCircle2, Mic, MoreVertical, Trash2, XCircle, GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { Button } from './ui/button';
import CreateJobApplicationDialogue from './create-job-dialog';
import JobCard from './job-card';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverEvent,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface KanbanBoardProps {
  board: Board | null;
  userId: string | undefined;
}

interface DragableColumnProps {
  column: Column;
  boardId?: string;
  config: {
    color: string;
    gradient: string;
    icon: React.ReactNode;
  };
  jobs: any[];
  loading: boolean;
  onJobAdded: (job: any) => void;
  onRefresh: () => void;
}

const COLUMN_CONFIG: Array<{ color: string; gradient: string; icon: React.ReactNode }> = [
  {
    color: "bg-cyan-500",
    gradient: "linear-gradient(135deg, oklch(0.65 0.15 200) 0%, oklch(0.55 0.12 210) 100%)",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    gradient: "linear-gradient(135deg, oklch(0.60 0.20 290) 0%, oklch(0.50 0.18 280) 100%)",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    gradient: "linear-gradient(135deg, oklch(0.65 0.18 160) 0%, oklch(0.55 0.15 150) 100%)",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    gradient: "linear-gradient(135deg, oklch(0.75 0.15 85) 0%, oklch(0.65 0.12 75) 100%)",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    gradient: "linear-gradient(135deg, oklch(0.60 0.22 25) 0%, oklch(0.50 0.20 15) 100%)",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DroppableColumn({ column, config, boardId, jobs, loading, onJobAdded, onRefresh }: DragableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: {
      columnId: column._id,
      type: 'column',
    },
  });

  const jobIds = jobs.map(job => job._id);

  return (
    <Card
      ref={setNodeRef}
      className={`py-0 min-w-80 bg-white  shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden animate-slide-up ${isOver ? 'ring-2 ring-purple-500 ring-offset-2 bg-p-50/50 scale-[1.02]' : ''
        }`}
    >
      <CardHeader
        className="text-white rounded-t-lg py-3 relative overflow-hidden"
        style={{ background: config.gradient }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              {config.icon}
            </div>
            <CardTitle className="text-white text-base font-semibold tracking-wide">
              {column.name}
            </CardTitle>
            <span className="text-xs bg-white/25 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
              {jobs.length}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-white/20 transition-colors"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-0">
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-4 pb-4 px-3 bg-linear-to-b from-gray-50/80 to-white/90 min-h-125 backdrop-blur-sm">
        <CreateJobApplicationDialogue
          boardId={boardId!}
          columnId={column._id}
          onSuccess={onJobAdded}
        />

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-32 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-xl"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite'
                }}
              />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            <div className="mb-2 opacity-50">
              <Calendar className="h-8 w-8 mx-auto" />
            </div>
            No jobs yet. Click "Add Job" to get started.
          </div>
        ) : (
          <SortableContext items={jobIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} onUpdate={onRefresh} />
              ))}
            </div>
          </SortableContext>
        )}
      </CardContent>
    </Card>
  );
}

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  const router = useRouter();
  const [activeJob, setActiveJob] = useState<any>(null);
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const fetchAllJobs = async () => {
    if (!board) return;

    try {
      setLoading(true);
      const jobPromises = board.columns.map(column =>
        fetch(`/api/jobs?columnId=${column._id}`).then(res => res.json())
      );
      const jobsArrays = await Promise.all(jobPromises);
      const flatJobs = jobsArrays.flat();
      setAllJobs(flatJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, [board]);

  // Silently refresh without showing loading state
  const refreshSilently = async () => {
    if (!board) return;

    try {
      const jobPromises = board.columns.map(column =>
        fetch(`/api/jobs?columnId=${column._id}`).then(res => res.json())
      );
      const jobsArrays = await Promise.all(jobPromises);
      const flatJobs = jobsArrays.flat();
      setAllJobs(flatJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Optimistically add a new job
  const addJob = async (newJob: any) => {
    setAllJobs(prev => [...prev, newJob]);
    // Silently sync with server after a short delay
    setTimeout(() => refreshSilently(), 300);
  };

  // Optimistically update a job
  const updateJob = async (jobId: string, updates: any) => {
    setAllJobs(prev =>
      prev.map(job =>
        job._id === jobId ? { ...job, ...updates } : job
      )
    );
    // Silently sync with server after a short delay
    setTimeout(() => refreshSilently(), 300);
  };

  // Optimistically delete a job
  const deleteJob = async (jobId: string) => {
    setAllJobs(prev => prev.filter(job => job._id !== jobId));
    // Silently sync with server after a short delay
    setTimeout(() => refreshSilently(), 300);
  };

  const handleRefresh = () => {
    refreshSilently();
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveJob(active.data.current?.job);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveJob(null);
      return;
    }

    const jobId = active.id as string;
    const oldColumnId = active.data.current?.columnId;

    // Get the column ID from the drop target
    let newColumnId = over.id as string;
    if (over.data.current?.columnId) {
      newColumnId = over.data.current.columnId;
    }

    // Only make API call if moving to a different column
    if (oldColumnId === newColumnId) {
      setActiveJob(null);
      return;
    }

    // Optimistically update local state immediately
    setAllJobs(prevJobs =>
      prevJobs.map(job =>
        job._id === jobId
          ? { ...job, columnId: newColumnId }
          : job
      )
    );

    setActiveJob(null);

    try {
      const response = await fetch(`/api/jobs/${jobId}/move`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          columnId: newColumnId,
          order: 0
        }),
      });

      if (response.ok) {
        const { toast } = await import('sonner');
        toast.success('Job moved successfully!');
        // No refresh needed - optimistic update already applied
      } else {
        const { toast } = await import('sonner');
        toast.error('Failed to move job');
        // Revert optimistic update on failure
        refreshSilently();
      }
    } catch (error) {
      console.error('Error moving job:', error);
      const { toast } = await import('sonner');
      toast.error('Failed to move job');
      // Revert optimistic update on error
      refreshSilently();
    }
  };

  const getJobsForColumn = (columnId: string) => {
    return allJobs.filter(job => job.columnId === columnId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {board?.name}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Drag and drop to organize your applications</p>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-6 px-1">
          {board?.columns.map((column, index) => {
            const config = COLUMN_CONFIG[index] || {
              color: "bg-gray-500",
              gradient: "linear-gradient(135deg, oklch(0.50 0.05 264) 0%, oklch(0.40 0.03 264) 100%)",
              icon: <Calendar className="h-4 w-4" />,
            };
            return (
              <DroppableColumn
                key={column._id}
                column={column}
                config={config}
                boardId={board?._id}
                jobs={getJobsForColumn(column._id)}
                loading={loading}
                onJobAdded={addJob}
                onRefresh={refreshSilently}
              />
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {activeJob ? (
          <div className="opacity-90 scale-105 rotate-2 transition-transform duration-200" style={{ cursor: 'grabbing' }}>
            <JobCard job={activeJob} onUpdate={() => { }} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;