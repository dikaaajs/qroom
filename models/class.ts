import mongoose, { Schema, models } from "mongoose";

const classSchema = new Schema(
  {
    label: {
      type: String,
      required: true
    },
    teachersRef: {
      type: [Schema.Types.ObjectId],
      required: true
    },
    quizRef: {
      type: [Schema.Types.ObjectId],
    },
    studentsRef: {
      type: [Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

const Class = models.Class || mongoose.model("Class", classSchema);
export default Class;
