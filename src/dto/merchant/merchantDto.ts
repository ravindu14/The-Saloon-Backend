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
