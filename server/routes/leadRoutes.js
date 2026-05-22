import express from "express";
import Lead from "../models/Lead.js";

const router = express.Router();

/* GET LEADS */
router.get("/:uniqueId", async (req, res) => {

  try {

    const leads = await Lead.find({
      ownerUniqueId: req.params.uniqueId,
    }).sort({
      createdAt: -1,
    });

    res.json(leads);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

export default router;