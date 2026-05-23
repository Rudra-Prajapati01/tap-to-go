import mongoose from "mongoose";

const productSchema =
  new mongoose.Schema(

    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      image: {
        type: String,
        default: "",
      },

      name: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      price: {
        type: String,
        default: "",
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Product",
  productSchema
);