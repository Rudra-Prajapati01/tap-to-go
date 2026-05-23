import express from "express";

import Lead from "../models/Lead.js";

import {
  createLead,
} from "../controllers/leadController.js";

const router = express.Router();


// CREATE LEAD
router.post(
  "/",
  createLead
);


// GET USER LEADS
router.get(
  "/:ownerId",

  async (req, res) => {

    try {

      const leads =
        await Lead.find({

          owner:
            req.params.ownerId,

        }).sort({

          createdAt: -1,

        });

      res.json(leads);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",
      });

    }

  }
);

export default router;