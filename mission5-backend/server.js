import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import auctionRoutes from "./routes/auctionRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

app.get("/", (req, res) => {
  res.send("Mission 5 Backend Running");
});

app.use("/api", auctionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
