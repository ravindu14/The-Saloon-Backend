import { Request, Response, NextFunction, Router } from "express";

import Controller from "../../shared/interfaces/controller.interface";
import {
  InternalServerError,
  InvalidRequestException,
} from "../../shared/exceptions/request.exception";
import { DataMissingException } from "../../exceptions/auth.exception";
import { AuthService } from "../../services/auth/authService";
import { UserDto } from "../../dto/auth/authDto";
import { plainToClass } from "class-transformer";

export class AuthController implements Controller {
  private authService;
  constructor(authService: AuthService) {
    this.authService = authService;
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
      const userDto: UserDto = plainToClass(UserDto, request.body, {
        enableImplicitConversion: true,
      });

      if (!userDto.userId) {
        return next(new DataMissingException());
      }

      const data = await this.authService.createUser(userDto);
      if (!data) {
        return response.status(400).json({ success: false });
      }
      return response.status(200).json({ success: true, data });
    } catch (error) {
      return next(new InternalServerError());
    }
  };
}

export const createAuthController = (): AuthController => {
  return new AuthController(new AuthService());
};
