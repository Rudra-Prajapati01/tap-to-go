import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    ownerUniqueId: {
      type: String,
    },

    name: String,

    email: String,

    phone: String,

    company: String,

    message: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Lead",
  leadSchema
);