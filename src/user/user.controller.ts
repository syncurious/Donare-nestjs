import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { JWTAuthPayload } from 'src/common/services/token.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('profile')
    async getUserProfile(@Req() req: Request) {
        const token = req['token'];
        const user :JWTAuthPayload= req['user']
        return this.userService.getUserProfile(token, user);
    }
}
