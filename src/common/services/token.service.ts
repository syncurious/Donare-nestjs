import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JWTAuthPayload {
  userId: string;
  email: string;
  role?: string;
  [key: string]: any;
}

@Injectable()
export class TokenService {
  generateJWTToken(payload: JWTAuthPayload, secretKey: string, expiresIn: string = '24h'): string {
    return jwt.sign(payload, secretKey, { expiresIn } as jwt.SignOptions);
  }

  async verifyJWTToken(token: string, secretKey: string): Promise<JWTAuthPayload> {
    try {
      return jwt.verify(token, secretKey) as JWTAuthPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async decodeJWTToken(token: string): Promise<JWTAuthPayload | null> {
    try {
      return jwt.decode(token) as JWTAuthPayload;
    } catch (error) {
      return null;
    }
  }
} 