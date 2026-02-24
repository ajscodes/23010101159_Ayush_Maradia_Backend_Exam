import express from "express";
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/tickets/:id/comments", addComment);
router.get("/tickets/:id/comments", getComments);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
