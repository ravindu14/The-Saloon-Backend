import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
  } from "class-validator";
  import { Expose, Type } from "class-transformer";
  
  export enum UserRoleEnum {
    admin = "Admin",
    merchant = "Merchant",
    user = "User",
  }
  
  enum UserStatus {
    activated = "Activated",
    pending = "Pending",
    deactivated = "Deactivated",
  }
  
  export class UserprofileDto {
    @Expose()
    @IsString()
    public userId: string;
  
    @Expose()
    @IsString()
    public userName: string;
  
    @Expose()
    @IsString()
    public firstName: string;
  
    @Expose()
    @IsString()
    public lastName: string;
  
    @Expose()
    @IsEmail()
    public email: string;
  
    @Expose()
    @IsString()
    public contact: string;
  
    @Expose()
    @IsString()
    public password: string;
  
    @Expose()
    @IsEnum(UserRoleEnum)
    @IsNotEmpty()
    public userRole: string;
  
    @Expose()
    @IsEnum(UserStatus)
    public status: boolean;
  }
  
  export class UserCredentials {
    @Expose()
    @IsString()
    public userName: string;
  
    @Expose()
    @IsString()
    public password: string;
  }
  