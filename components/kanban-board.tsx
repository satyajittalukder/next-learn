"use client";
import column from '@/lib/models/column';
import { Board, Column } from '@/lib/models/model.type';
import { Award, Calendar, CheckCircle2, Mic, MoreVertical, Trash2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { Button } from './ui/button';
import CreateJobApplicationDialogue from './create-job-dialog';

interface KanbanBoardProps {
  board: Board | null;
  userId: string | undefined;
}

interface DragableColumnProps {
  column: Column;
  boardId?: string;
  config:
  {
    color: string,
    icon: React.ReactNode
  }
}
const COLUMN_CONFIG: Array<{ color: string; icon: React.ReactNode }> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  }
]
function DroppableColumn({ column, config, boardId }: DragableColumnProps) {
  console.log(column)
  return (
    <Card className="min-w-75 shrink-0 shadow-md p-0">
      <CardHeader
        className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent
        className={`space-y-2 pt-4 bg-gray-50/50 min-h-100 rounded-b-lg `}
      >
        <CreateJobApplicationDialogue boardId={boardId!} columnId={column._id} />
      </CardContent>
    </Card>)
}

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  console.log(board)
  return (
    <>
      <div className='space-y-4'>{board?.name}</div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {board?.columns.map((column, index) => {
          const config = COLUMN_CONFIG[index] || { color: "bg-gray-500", icon: <Calendar className="h-4 w-4" /> };
          return (
            <DroppableColumn key={index} column={column} config={config} boardId={board?._id} />
          );
        })}
      </div>
    </>

  )
}

export default KanbanBoard