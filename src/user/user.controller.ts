import { Controller, Get, Patch, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { JWTAuthPayload } from 'src/common/services/token.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('profile')
    async getUserProfile(@Req() req: Request) {
        const user: JWTAuthPayload = req['user']
        return this.userService.getUserProfile(user);
    }

    @Get('preferences')
    async getPreferences(@Req() req: Request) {
        const user: JWTAuthPayload = req['user'];
        return this.userService.getPreferences(user);
    }

    @Patch('preferences')
    async updatePreferences(@Req() req: Request) {
        const user: JWTAuthPayload = req['user'];
        return this.userService.updatePreferences(user, req.body);
    }
}
