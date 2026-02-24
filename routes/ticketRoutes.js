import express from "express";
import {
  createTicket,
  getTicket,
  assignTicket,
  updateStatus,
  deleteTicket,
} from "../controllers/ticketController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware("USER", "MANAGER"), createTicket);
router.get("/", getTicket);

router.patch("/:id/assign", roleMiddleware("MANAGER", "SUPPORT"), assignTicket);
router.patch("/:id/status", roleMiddleware("MANAGER", "SUPPORT"), updateStatus);

router.delete("/:id", roleMiddleware("MANAGER"), deleteTicket);

export default router;
