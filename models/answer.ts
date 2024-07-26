import mongoose, { Schema, models } from "mongoose";

const answerSchema = new Schema(
  {
    answer: {
      type: [],
    },
    quizRef: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
    },
    userRef: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Answer = models.Answer || mongoose.model("Answer", answerSchema);
export default Answer;
