import { Request, Response, NextFunction, Router } from "express";

import Controller from "../../shared/interfaces/controller.interface";
import { InternalServerError } from "../../shared/exceptions/request.exception";
import { MerchantService } from "../../services/merchant/merchantService";
import { plainToClass } from "class-transformer";
import {
  CreateServiceDto,
  MerchantProfileDto,
} from "../../dto/merchant/merchantDto";

export class MerchantController implements Controller {
  private merchantService;
  constructor(merchantService: MerchantService) {
    this.merchantService = merchantService;
  }

  /**
   * Add new service to a merchant
   * @param request
   * @param response
   * @param next
   * @returns {Object}
   */
  public createService = async (
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

      const service: CreateServiceDto = plainToClass(
        CreateServiceDto,
        request.body
      );

      const newService: CreateServiceDto =
        await this.merchantService.createService({
          ...service,
          userId: request.user,
        });

      if (!newService) {
        return response
          .status(400)
          .json({ success: false, data: { message: "Bad request" } });
      }

      return response.status(200).json({ success: true, data: newService });
    } catch (error) {
      return next(new InternalServerError());
    }
  };

  /**
   * get all functions for a merchant by merchant ID
   * @param request
   * @param response
   * @param next
   * @returns
   */
  public getAllServices = async (
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

      const services: any = await this.merchantService.getAllServicesByUserId(
        request.user
      );

      return response.status(200).json({ success: true, data: services });
    } catch (error) {
      return next(new InternalServerError());
    }
  };

  public getMerchantProfile = async (
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

      const profile: MerchantProfileDto =
        await this.merchantService.getMerchantProfileById(request.user);

      return response.status(200).json({ success: true, data: profile });
    } catch (error) {
      return next(new InternalServerError());
    }
  };

  public updateMerchantProfile = async (
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

      const updatedProfile = request.body;

      const profile: MerchantProfileDto =
        await this.merchantService.updateMerchantProfile(
          request.user,
          updatedProfile
        );

      return response.status(200).json({ success: true, data: profile });
    } catch (error) {
      return next(new InternalServerError());
    }
  };

  public getMerchantProfilesByName = async (
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

      const { keyword } = request.body;

      const profiles: MerchantProfileDto[] =
        await this.merchantService.getProfileByMerchantName(keyword);

      return response.status(200).json({ success: true, data: profiles });
    } catch (error) {
      return next(new InternalServerError());
    }
  };
}

export const createMerchantController = (): MerchantController => {
  return new MerchantController(new MerchantService());
};
