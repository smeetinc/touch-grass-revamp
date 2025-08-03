import mongoose, { Schema, models } from "mongoose";

const PlanSchema = new Schema(
  {
    planTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    vibeCheck: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isClique: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: String, // wallet address
      required: true,
    },
    cliqueId: {
      type: Schema.Types.ObjectId,
      ref: "Clique",
      required: true,
    },
  },
  { timestamps: true }
);

const Plan = models.Plan || mongoose.model("Plan", PlanSchema);

export default Plan;
