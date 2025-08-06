import { IsNotEmpty, IsString } from "class-validator";

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
    message: string;
}