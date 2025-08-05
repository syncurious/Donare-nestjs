import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseService } from 'src/common/services/response.service';
import { JWTAuthPayload, TokenService } from 'src/common/services/token.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly res: ResponseService
    ) { }
    async getUserProfile(token: string, user: JWTAuthPayload) {
        const { userId } = user

        const userData = await this.prisma.users.findFirst({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                city: true,
                createdAt: true,
                updatedAt: true,
                preferences: {
                    select: {
                        lastZakatDate: true,
                        receiveZakatRemainder: true,
                        stayUpdatedOnNewCampaigns: true,
                    }
                }
            }
        });

        return this.res.formatResponse(userData, undefined, true, HttpStatus.OK);
    }
}
