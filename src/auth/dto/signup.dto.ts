import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Role } from "../enums/role.enum";
import { UserPreferencesDto } from "./userPreference.dto";
import { Optional } from "@nestjs/common";

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ValidateNested()
  @Optional()
  @Type(() => UserPreferencesDto)
  userPreferences: UserPreferencesDto;
}