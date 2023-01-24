import * as jwt from "jsonwebtoken";
import { IDataInToken } from "../../dal/session/model";
import { _JWT_SECRET_, TOKEN_EXPIRES_IN } from "../config/common";

export function createToken({ id }): string {
  const expiresIn = TOKEN_EXPIRES_IN;
  const dataStoredInToken: IDataInToken = {
    id,
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  };
  return jwt.sign(dataStoredInToken, _JWT_SECRET_);
}

export function verifyToken(key): any {
  return jwt.verify(key, _JWT_SECRET_);
}

export function isExpired(key): boolean {
  return verifyToken(key).exp < Math.floor(Date.now() / 1000);
}
