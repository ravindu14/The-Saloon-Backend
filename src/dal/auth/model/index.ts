import { Schema, model, Document } from "mongoose";
import { UserRoleEnum } from "../../../dto/auth/authDto";

interface IAuthUser extends Document {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  userRole: string;
  status: string;
}

const authUserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: UserRoleEnum,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IAuthUser>("authUser", authUserSchema);
