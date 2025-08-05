import { HttpStatus, Injectable } from '@nestjs/common';
import { UserPreferencesDto } from 'src/auth/dto/userPreference.dto';
import { ResponseService } from 'src/common/services/response.service';
import { JWTAuthPayload } from 'src/common/services/token.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserProfileDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly res: ResponseService
    ) { }
    async getUserProfile(user: JWTAuthPayload) {
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
    async getPreferences(user: JWTAuthPayload) {
        const { userId } = user
        const userData = await this.prisma.userPreferences.findUnique({
            where: { userId: userId },
        });
        if (!userData) {
            return this.res.formatResponse(null, 'User preferences not found', false, HttpStatus.NOT_FOUND);
        }
        return this.res.formatResponse(userData, undefined, true, HttpStatus.OK);
    }
    async updateUserProfile(user: JWTAuthPayload, body: UserProfileDto) {
        const { userId } = user
        const userData = await this.prisma.users.update({
            where: { id: userId },
            data: {
                fullName: body.fullName,
                email: body.email,
            }
        });
        if (!userData) {
            return this.res.formatResponse(null, 'User not found', false, HttpStatus.NOT_FOUND);
        }
        return this.res.formatResponse(userData, undefined, true, HttpStatus.OK);
    }
    async updatePreferences(user: JWTAuthPayload, body: UserPreferencesDto) {
        const { userId } = user

        const userData = await this.prisma.userPreferences.update({
            where: { userId: userId },
            data: {
                lastZakatDate: body.lastZakatDate,
                receiveZakatRemainder: body.receiveZakatRemainder,
                stayUpdatedOnNewCampaigns: body.stayUpdatedOnNewCampaigns
            },
            select: {
                lastZakatDate: true,
                receiveZakatRemainder: true, 
                stayUpdatedOnNewCampaigns: true,
            }
        });
        return this.res.formatResponse(userData, undefined, true, HttpStatus.OK);
    }
}
