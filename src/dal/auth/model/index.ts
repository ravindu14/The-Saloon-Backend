import { Schema, model, Document } from "mongoose";

interface IAuth extends Document {
  userId: string;
}

const authSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IAuth>("auth", authSchema);
