import Ticket from "../models/Ticket.js";

export const addComment = async (req, res) => {
  const { comment } = req.body;

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (req.user.role === "USER" && ticket.createdBy.name !== req.user.name) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (
    req.user.role === "SUPPORT" &&
    ticket.assignedTo?.name !== req.user.name
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  ticket.comments.push({
    authorName: req.user.name,
    authorRole: req.user.role,
    comment,
  });

  await ticket.save();
  res.status(201).json(ticket.comments);
};

export const getComments = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  res.status(200).json(ticket.comments);
};

export const updateComment = async (req, res) => {
  const { comment } = req.body;

  const ticket = await Ticket.findOne({
    "comments._id": req.params.id,
  });

  if (!ticket) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const commentObj = ticket.comments.id(req.params.id);

  if (req.user.role !== "MANAGER" && commentObj.authorName !== req.user.name) {
    return res.status(403).json({ message: "Forbidden" });
  }

  commentObj.comment = comment;
  await ticket.save();
  res.status(200).json(commentObj);
};

export const deleteComment = async (req, res) => {
  const ticket = await Ticket.findOne({
    "comments._id": req.params.id,
  });

  if (!ticket) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const commentObj = ticket.comments.id(req.params.id);

  if (req.user.role !== "MANAGER" && commentObj.authorName !== req.user.name) {
    return res.status(403).json({ message: "Forbidden" });
  }

  commentObj.deleteOne();
  await ticket.save();
  res.status(204).end();
};
