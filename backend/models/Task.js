import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Missed"],
      default: "Pending",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    startDate: {
      type: Date,
      required: true,
    },

    // ✅ KEEP ONLY THIS ONE
    dueDate: {
      type: Date,
    },

    isRoutine: {
      type: Boolean,
      default: false,
    },

    repeat: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly", "yearly"],
      default: "none",
    },

    nextRun: Date,
    rescheduledFrom: Date,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      default: "General",
    },

    // ✅ NEW FEATURE
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);