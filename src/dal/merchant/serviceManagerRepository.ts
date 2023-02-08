import { CreateServiceDto } from "../../dto/merchant/merchantDto";
import ServicesSchema from "./model/services";

export class ServicesManagerRepository {
  private model: any;

  constructor() {
    this.model = ServicesSchema;
  }

  public createService = async (service: CreateServiceDto) => {
    return await this.model.create(service);
  };

  public getAllServicesByUserId = async (userId: String) => {
    const services = await this.model.find({ userId });

    return services ? services : [];
  };
}
