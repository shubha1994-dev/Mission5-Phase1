import express from "express";
import Auction from "../models/Auction.js";

const router = express.Router();

/*
GET /api/search?keyword=iphone
*/

router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword) {
      return res.status(400).json({
        error: "Keyword is required",
      });
    }

    const auctions = await Auction.find({
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(auctions);
  } catch (error) {
    console.error("Search Error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
