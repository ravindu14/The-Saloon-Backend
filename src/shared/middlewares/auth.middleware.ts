import { NextFunction, Response, Request } from "express";
import {
  AuthenticationTokenExpiredException,
  AuthenticationTokenMissingException,
  InvalidAuthenticationTokenException,
} from "../exceptions/request.exception";
import { isExpired } from "../helpers/token";
import { SessionService } from "../../services/session/sessionService";

const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const header = request.headers;
  if (header && header.authorization) {
    try {
      const authToken = header.authorization;

      if (isExpired(authToken)) {
        next(new AuthenticationTokenExpiredException());
      }

      const sessionService = new SessionService();

      const { userId } = await sessionService.findSession(authToken);

      if (!userId) {
        next(new InvalidAuthenticationTokenException());
      }
      request.user = userId;
      next();
    } catch (error) {
      next(new InvalidAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
};

export default authMiddleware;
