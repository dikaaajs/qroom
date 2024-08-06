import mongoose, { Schema, models } from "mongoose";

const kelasSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    teachersRef: {
      type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
      required: true,
    },
    quizRef: {
      type: [{ type: Schema.Types.ObjectId, ref: "Kuis" }],
    },
    studentsRef: {
      type: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    },
  },
  { timestamps: true }
);

const Kelas = models.Kelas || mongoose.model("Kelas", kelasSchema);
export default Kelas;
