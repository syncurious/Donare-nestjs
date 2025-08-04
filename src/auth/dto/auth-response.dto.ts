export class UserResponseDto {
  id: string;
  email: string;
  fullName: string;
  role: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AuthResponseDto {
  token: string;
  user: UserResponseDto;
  message?: string;
}

export class ErrorResponseDto {
  statusCode: number;
  message: string;
  error: string;
} 