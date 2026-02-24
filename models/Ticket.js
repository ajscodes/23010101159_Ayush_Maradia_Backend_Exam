import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    authorName: String,
    authorRole: String,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const statusLogSchema = new mongoose.Schema(
  {
    oldStatus: String,
    newStatus: String,
    changedBy: {
      name: String,
      role: String,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      default: "OPEN",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },
    createdBy: {
      name: String,
      role: String,
    },
    assignedTo: {
      name: String,
      role: String,
    },
    comments: [commentSchema],
    statusLogs: [statusLogSchema],
  },
  { timestamps: true },
);

export const Ticket = mongoose.model("Ticket", ticketSchema);
