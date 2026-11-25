import mongoose from "mongoose";
import dotenv from "dotenv";

import Auction from "../models/Auction.js";
import { auctions } from "./seedData.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const action = process.argv[2];

if (action === "seed") {
  await Auction.insertMany(auctions);

  console.log("Data Added Successfully");
} else if (action === "delete") {
  await Auction.deleteMany();

  console.log("Data Deleted Successfully");
} else {
  console.log("Usage:");

  console.log("node seed/seed.js seed");

  console.log("node seed/seed.js delete");
}

mongoose.connection.close();
