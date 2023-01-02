import { IsString, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";

export class UserDto {
  @Expose()
  @IsString()
  public userId: string;
}
