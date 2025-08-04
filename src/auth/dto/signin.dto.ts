import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserResponseDto } from './auth-response.dto';

export class SigninDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class LoginResponseDTO {
    static create(token: string, user: UserResponseDto, refreshToken: string): LoginResponseDTO {
        const response = new LoginResponseDTO();
        response.token = token;
        response.user = user;
        response.refrashToken = refreshToken;
        return response;
    }
    token: string;
    refrashToken: string
    user: UserResponseDto;
}