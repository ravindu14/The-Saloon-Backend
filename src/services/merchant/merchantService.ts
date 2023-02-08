import { ServicesManagerRepository } from "../../dal/merchant/serviceManagerRepository";
import { CreateServiceDto } from "../../dto/merchant/merchantDto";

export class MerchantService {
  private servicesRepo: ServicesManagerRepository;

  constructor() {
    this.servicesRepo = new ServicesManagerRepository();
  }

  public createService = async (service: CreateServiceDto): Promise<any> => {
    return await this.servicesRepo.createService(service);
  };

  public getAllServicesByUserId = async (userId: String): Promise<any> => {
    return await this.servicesRepo.getAllServicesByUserId(userId);
  };
}
