import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CreateServiceDto {
  @Expose()
  @IsString()
  public id: string;

  @Expose()
  @IsString()
  public userId: string;

  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsString()
  public duraiton: string;

  @Expose()
  @IsString()
  public price: string;

  @Expose()
  @IsString()
  public description: string;
}

export class MerchantProfileDto {
  @Expose()
  @IsString()
  public userId: string;

  @Expose()
  @IsString()
  public businessName: string;

  @Expose()
  @IsString()
  public address: string;

  @Expose()
  @IsString()
  public contact: string;

  @Expose()
  @IsString()
  public openTime: string;

  @Expose()
  @IsString()
  public closeTime: string;

  @Expose()
  @IsString()
  public bannerImage: string;

  @Expose()
  @IsString()
  public description: string;

  @Expose()
  @IsString()
  public latitude: string;

  @Expose()
  @IsString()
  public longitude: string;
}
