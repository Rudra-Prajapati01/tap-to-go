import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // BASIC INFO
    name: {
      type: String,
      default: "",
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
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

    uniqueId: {
      type: String,
      unique: true,
    },

    // PROFILE
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

    coverTheme: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    jobTitle: {
      type: String,
      default: "",
    },

    // COMPANY
    companyName: {
      type: String,
      default: "",
    },

    companyContact: {
      type: String,
      default: "",
    },

    // ADDRESS
    streetAddress: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    postcode: {
      type: String,
      default: "",
    },

    location: {
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

    facebook: {
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

    // ✅ LEAD FORM SETTINGS
    leadCapture: {

      enabled: {
        type: Boolean,
        default: true,
      },

      fields: {

        name: {
          type: Boolean,
          default: true,
        },

        email: {
          type: Boolean,
          default: true,
        },

        phone: {
          type: Boolean,
          default: true,
        },

        company: {
          type: Boolean,
          default: false,
        },

        message: {
          type: Boolean,
          default: false,
        },
      },
    },
    // THEME
    theme: {
      profileTheme: {
        type: String,
        default: "#7c3aed",
      },

      backgroundColor: {
        type: String,
        default: "#ffffff",
      },

      textColor: {
        type: String,
        default: "#1e293b",
      },

      buttonColor: {
        type: String,
        default: "#7c3aed",
      },

      buttonTextColor: {
        type: String,
        default: "#ffffff",
      },

      fontFamily: {
        type: String,
        default: "Poppins",
      },

      cardView: {
        type: String,
        default: "left",
      },
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