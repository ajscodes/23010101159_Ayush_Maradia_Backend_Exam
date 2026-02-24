import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import connectDB from "./config/db.js";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();
connectDB();
console.log("------Mongo connection string: ", process.env.MONGO_URL);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tickets", ticketRoutes);
app.use("/comments", commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`------Server running on: ${PORT}`);
});
