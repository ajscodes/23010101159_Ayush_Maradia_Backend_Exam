import express from "express";
import { createUser, getUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("MANAGER"));

router.post("/", createUser);
router.get("/", getUser);

export default router;
