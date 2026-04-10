import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITshirtRegistration extends Document {
  name: string;
  rollNumber: string;
  tshirtSize: string;
  createdAt: Date;
}

const TshirtRegistrationSchema = new Schema<ITshirtRegistration>(
  {
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    tshirtSize: {
      type: String,
      enum: ["S", "M", "L", "XL"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

export const TshirtRegistration: Model<ITshirtRegistration> =
  (mongoose.models.TshirtRegistration as Model<ITshirtRegistration>) ||
  mongoose.model<ITshirtRegistration>(
    "TshirtRegistration",
    TshirtRegistrationSchema
  );
