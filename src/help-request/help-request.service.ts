import { Injectable } from '@nestjs/common';

import { CreateHelpRequestDto } from './dto/help-request.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class HelpRequestService {
    constructor(private readonly prisma: PrismaService) {}

    async createHelpRequest(createHelpRequestDto: CreateHelpRequestDto, userId: string) {
        return this.prisma.helpRequests.create({ 
            data: {
                ...createHelpRequestDto,
                message: createHelpRequestDto.description,
                userId: userId
            } 
        });
    }

    async getHelpRequests(userId: string) {
        return this.prisma.helpRequests.findMany({
            where: {
                userId: userId
            }
        });
    }
}
