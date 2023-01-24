import { Schema, model, Document } from "mongoose";

export interface IDataInToken {
  id: string;
  exp: number;
}

interface ISession extends Document {
  id: string;
  userId: string;
  token: string;
  expiry: string;
  role: string;
}

const sessionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ISession>("session", sessionSchema);
