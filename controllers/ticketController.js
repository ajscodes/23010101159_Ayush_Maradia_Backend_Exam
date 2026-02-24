import Ticket from "../models/Ticket.js";
import { isValidTransition } from "../utils/statusTransition.js";
import User from "../models/User.js";

export const createTicket = async (req, res) => {
  const { title, description, priority } = req.body;

  const ticket = await Ticket.create({
    title,
    description,
    priority,
    createdBy: {
      name: req.user.name,
      role: req.user.role,
    },
  });

  res.status(201).json(ticket);
};

export const getTicket = async (req, res) => {
  let tickets;

  if (req.user.role === "MANAGER") {
    tickets = await Ticket.find();
  }

  if (req.user.role === "SUPPORT") {
    tickets = await Ticket.find({ "assignedTo.name": req.user.name });
  }

  if (req.user.role === "USER") {
    tickets = await Ticket.find({ "createdBy.name": req.user.name });
  }

  res.status(200).json(tickets);
};

export const assignTicket = async (req, res) => {
  const { userId } = req.body;

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  const user = await User.findById(userId);
  if (!user || user.role === "USER") {
    return res.status(400).json({ message: "Invalid Role" });
  }

  ticket.assignedTo = {
    name: user.name,
    role: user.role,
  };

  await ticket.save();
  res.status(200).json(ticket);
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (!isValidTransition(ticket.status, status)) {
    return res.status(400).json({ message: "Invalid status change" });
  }

  ticket.statusLogs.push({
    oldStatus: ticket.status,
    newStatus: status,
    changedBy: {
      name: req.user.name,
      role: req.user.role,
    },
  });

  ticket.status = status;
  await ticket.save();

  res.status(200).json(ticket);
};

export const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  await ticket.deleteOne();
  res.status(204).end();
};
