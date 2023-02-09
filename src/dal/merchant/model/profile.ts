import { Schema, model, Document } from "mongoose";

interface IMerchantProfile extends Document {
  userId: string;
  businessName: string;
  address: string;
  contact: string;
  openTime: string;
  closeTime: string;
  bannerImage: string;
  description: string;
  latitude: string;
  longitude: string;
}

const merchantProfileSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: true,
    },
    openTime: {
      type: String,
      required: true,
    },
    closeTime: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    latitude: {
      type: String,
      required: false,
    },
    longitude: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IMerchantProfile>("merchants", merchantProfileSchema);
