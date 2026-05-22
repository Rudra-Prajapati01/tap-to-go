import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // BASIC INFO
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // UNIQUE PUBLIC ID
    uniqueId: {
      type: String,
      unique: true,
    },

    // PROFILE DETAILS
    firstName: {
      type: String,
      default: "",
    },

    lastName: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    jobTitle: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    // WEBSITE
    companyUrl: {
      type: String,
      default: "",
    },

    // IMAGES
    profileImage: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    logoImage: {
      type: String,
      default: "",
    },

    // SOCIAL LINKS
    instagram: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    // QR SETTINGS
    qrActive: {
      type: Boolean,
      default: true,
    },

    totalScans: {
      type: Number,
      default: 0,
    },

  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "User",
  userSchema
);