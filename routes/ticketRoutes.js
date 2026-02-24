import express from "express";
import { createTicket, getTicket } from "../controllers/ticketController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware("USER", "MANAGER"), createTicket);
router.get("/", getTicket);

export default router;
