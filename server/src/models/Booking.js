import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expert",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Prevent double booking (same expert, same date, same time)
bookingSchema.index({ expertId: 1, date: 1, time: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
