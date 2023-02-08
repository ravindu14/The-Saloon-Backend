import { Schema, model, Document } from "mongoose";

interface IService extends Document {
  id: string;
  userId: string;
  name: string;
  duration: string;
  price: string;
  description: string;
}

const servicesSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IService>("services", servicesSchema);
