import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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