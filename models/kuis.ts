import mongoose, { Schema, models } from "mongoose";

const optionSchema = new Schema({
  paragraf: {
    type: String,
  },
  image: {
    type: [String],
  },
});

const questionSchema = new Schema({
  paragraf: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    default: null,
  },
  options: {
    type: [optionSchema],
  },
});

const kuisSchema = new Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imgBannerUrl: {
      type: String,
    },
    timeStart: {
      type: String,
    },
    timeEnd: {
      type: String,
    },
    duration: {
      type: Number,
    },
    code: {
      type: String,
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    questions: {
      type: [questionSchema],
    },
  },
  { timestamps: true }
);

const Kuis = models?.Kuis || mongoose.model("Kuis", kuisSchema);
export default Kuis;
