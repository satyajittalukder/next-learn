"use client";
import column from '@/lib/models/column';
import { Board, Column } from '@/lib/models/model.type';
import { Award, Calendar, CheckCircle2, Mic, XCircle } from 'lucide-react';
import { Card } from './ui/card';

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
  return (
    <Card className={`w-72 p-4 ${config.color}`}>
    </Card>)
}

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  console.log(board)
  return (
    <>
      <div>{board?.name}</div>
      <div className="flex gap-6 mt-4">
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