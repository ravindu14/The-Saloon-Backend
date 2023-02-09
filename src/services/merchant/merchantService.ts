import { ServicesManagerRepository } from "../../dal/merchant/serviceManagerRepository";
import { ProfileManagerRepository } from "../../dal/merchant/profileManagerRepository";
import {
  CreateServiceDto,
  MerchantProfileDto,
} from "../../dto/merchant/merchantDto";

export class MerchantService {
  private servicesRepo: ServicesManagerRepository;
  private profileRepo: ProfileManagerRepository;

  constructor() {
    this.servicesRepo = new ServicesManagerRepository();
    this.profileRepo = new ProfileManagerRepository();
  }

  public createService = async (service: CreateServiceDto): Promise<any> => {
    return await this.servicesRepo.createService(service);
  };

  public getAllServicesByUserId = async (userId: String): Promise<any> => {
    return await this.servicesRepo.getAllServicesByUserId(userId);
  };

  public createMerchantProfile = async (
    profile: MerchantProfileDto
  ): Promise<any> => {
    return await this.profileRepo.createProfile(profile);
  };

  public getMerchantProfileById = async (
    userId: String
  ): Promise<MerchantProfileDto> => {
    return await this.profileRepo.getProfileByMerchant(userId);
  };

  public updateMerchantProfile = async (
    userId: String,
    profile: MerchantProfileDto
  ): Promise<MerchantProfileDto> => {
    return await this.profileRepo.updateMerchantProfile(userId, profile);
  };
}
