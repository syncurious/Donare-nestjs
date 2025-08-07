import { IsNotEmpty, IsString, IsEmail, IsEnum, IsUUID } from "class-validator";
import { AvailabilityStatus, Status } from "generated/prisma/client";

export class RegisterVolunteerDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    skills: string;

    @IsEnum(AvailabilityStatus)
    @IsNotEmpty()
    onWeekDays: AvailabilityStatus;

    @IsEnum(AvailabilityStatus)
    @IsNotEmpty()
    onWeekEnds: AvailabilityStatus;

    @IsString()
    @IsNotEmpty()
    message: string;
}

export class UpdateVolunteerDto {
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;
}

export class VolunteerIdDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}