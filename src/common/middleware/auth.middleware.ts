import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly tokenSr: TokenService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Invalid token format');
        }

        const decodedToken = await this.tokenSr.decodeJWTToken(token)
        if (!decodedToken) {
            throw new UnauthorizedException("Invalid Token")
        }
        req['token'] = token;
        req['user'] = decodedToken
        next();
    }
}