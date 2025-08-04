import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  email: string;
  role?: string;
  [key: string]: any;
}

@Injectable()
export class TokenService {
  generateJWTToken(payload: JWTPayload, secretKey: string, expiresIn: string = '24h'): string {
    return jwt.sign(payload, secretKey, { expiresIn } as jwt.SignOptions);
  }

  async verifyJWTToken(token: string, secretKey: string): Promise<JWTPayload> {
    try {
      return jwt.verify(token, secretKey) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async decodeJWTToken(token: string): Promise<JWTPayload | null> {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch (error) {
      return null;
    }
  }
} 