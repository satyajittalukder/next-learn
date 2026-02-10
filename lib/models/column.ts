import mongoose, { Schema, Document } from "mongoose";
import { Button } from '@/components/ui/button';

export interface IColumn extends Document {
  name: string;
  BoardId: string;
  order: number;
  jobApplicationIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ColumnSchema: Schema<IColumn> = new Schema(
  {
    name: { type: String, required: true },
    BoardId: { type: String, ref: "Board", required: true, index: true },
    order: { type: Number, required: true, default: 0 },
    jobApplicationIds: [{
      type: Schema.Types.ObjectId,
      ref: "JobApplication",
      default: []
    }]
  },
  { timestamps: true }
)
export default mongoose.models.Column || mongoose.model<IColumn>("Column", ColumnSchema);