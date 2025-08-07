import { IsNotEmpty, IsString } from "class-validator";
import { AvailabilityStatus } from "generated/prisma/client";

export class RegisterVolunteerDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    skills: string;

    @IsString()
    @IsNotEmpty()
    onWeekDays: AvailabilityStatus;

    @IsString()
    @IsNotEmpty()
    onWeekEnds: AvailabilityStatus;

    @IsString()
    @IsNotEmpty()
    message: string;
}