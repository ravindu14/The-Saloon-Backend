import { Request, Response, NextFunction, Router } from "express";
import { hashSync, genSaltSync } from "bcryptjs";

import Controller from "../../shared/interfaces/controller.interface";
import { InternalServerError } from "../../shared/exceptions/request.exception";
import {
  AuthenticationErrorException,
  DataMissingException,
} from "../../exceptions/auth.exception";
import { AuthService } from "../../services/auth/authService";
import { CurrentUser, UserCredentials, UserDto } from "../../dto/auth/authDto";
import { plainToClass } from "class-transformer";
import { SessionService } from "../../services/session/sessionService";

export class AuthController implements Controller {
  private authService;
  private sessionService;
  constructor(authService: AuthService, sessionService: SessionService) {
    this.authService = authService;
    this.sessionService = sessionService;
  }

  /**
   * create or update the existing instance of user in the DB
   * @param request
   * @param response
   * @param next
   * @returns {Object}
   */
  public createOrUpdateUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const userDto: UserDto = plainToClass(UserDto, request.body);

      if (!userDto.userId) {
        return next(new DataMissingException());
      }

      const salt = genSaltSync(10);
      const hashPassword = hashSync(userDto.password, salt);

      const newUser = {
        ...userDto,
        password: hashPassword,
      };

      const data = await this.authService.createUser(newUser);

      if (!data) {
        return response.status(400).json({ success: false });
      }
      return response.status(200).json({ success: true, data });
    } catch (error) {
      return next(new InternalServerError());
    }
  };

  /**
   * Login function to authenticate users (All roles)
   * @param request
   * @param response
   * @param next
   * @returns
   */
  public login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const userCredentials: UserCredentials = plainToClass(
        UserCredentials,
        request.body
      );

      const user: UserDto = await this.authService.authenticateUser(
        userCredentials
      );

      if (!user) {
        return next(new AuthenticationErrorException());
      }

      const { token } = await this.sessionService.createSession(user);

      if (!token) {
        return response.status(400).json({ success: false });
      }
      return response.status(200).json({ success: true, data: { token } });
    } catch (error) {
      return next(new InternalServerError());
    }
  };

  /**
   * get User profile after the authentication process.
   * This data will be used to display in the profile section and dashboards
   * @param request
   * @param response
   * @param next
   * @returns
   */
  public getUserProfile = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!request.user) {
        return response
          .status(400)
          .json({ success: false, message: "Unauthorized user" });
      }

      const currentUser: CurrentUser =
        await this.authService.getCurrentUserProfile(request.user);

      return response.status(200).json({ success: true, data: currentUser });
    } catch (error) {
      return next(new InternalServerError());
    }
  };

  /**
   * Update user profile function. The basic details of a any
   * user role can be changed using this function.
   * @param request
   * @param response
   * @param next
   * @returns
   */
  public updateUserProfile = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!request.user) {
        return response
          .status(400)
          .json({ success: false, message: "Unauthorized user" });
      }

      const updatedUser = request.body;

      const currentUser: CurrentUser = await this.authService.updateUserProfile(
        request.user,
        updatedUser
      );

      return response.status(200).json({ success: true, data: currentUser });
    } catch (error) {
      return next(new InternalServerError());
    }
  };
}

export const createAuthController = (): AuthController => {
  return new AuthController(new AuthService(), new SessionService());
};
