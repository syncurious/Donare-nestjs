import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Status } from "generated/prisma";

export class CreateHelpRequestDto {
    @IsString()
    fullName: string;
    @IsString()
    phone: string;
    @IsString()
    address: string;
    @IsString()
    @IsOptional()
    city: string;
    @IsString()
    @IsOptional()
    zipCode: string;
    @IsString()
    @IsOptional()
    country: string;
    @IsString()
    description: string;
    @IsString()
    @IsOptional()
    image: string;
}

export class UpdateHelpStatusDto {
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;
}
