import Ticket from "../models/Ticket.js";

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
