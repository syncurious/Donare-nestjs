import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../../auth/enums/role.enum';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        // The AuthMiddleware has already validated the token and set req.user
        const user = req['user'];
        
        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }
        
        // Check if user has admin role
        if (!user.role || user.role !== Role.ADMIN) {
            throw new ForbiddenException('Admin access required');
        }
        
        next();
    }
} 