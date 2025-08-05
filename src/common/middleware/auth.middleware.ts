import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('token retived')
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Invalid token format');
        }
        req['token'] = token;
        next();
    }
}