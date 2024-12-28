import mongoose, { Schema, model } from "mongoose";

const ContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tags: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Content = model("Content", ContentSchema);
