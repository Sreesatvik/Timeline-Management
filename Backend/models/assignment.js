import mongoose from "mongoose";
const { Schema, model } = mongoose;

const assignmentSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
const Assignment = model("Assignment", assignmentSchema);
export default Assignment;
