import mongoose from "mongoose";

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    slots: [
      {
        date: { type: String, required: true },
        time: { type: String, required: true },
        booked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Expert", expertSchema);
