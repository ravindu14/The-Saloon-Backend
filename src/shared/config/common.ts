require("dotenv").config();

export const _JWT_SECRET_ = process.env.JWT_SECRET || "the-saloon-secret";
export const TOKEN_EXPIRES_IN =
  parseInt(process.env.TOKEN_EXPIRES_IN, 10) || 604800;
