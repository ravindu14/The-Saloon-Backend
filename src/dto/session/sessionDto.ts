import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CreateSessionDto {
  @Expose()
  @IsString()
  public id: string;

  @Expose()
  @IsString()
  public userId: string;

  @Expose()
  @IsString()
  public token: string;

  @Expose()
  @IsString()
  public expiry: string;

  @Expose()
  @IsString()
  public role: string;
}
