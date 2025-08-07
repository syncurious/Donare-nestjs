import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateHelpRequestDto, UpdateHelpStatusDto } from './dto/help-request.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Prisma, Status } from 'generated/prisma';

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

    async getAllHelpRequests(status?: Status) {
        return this.prisma.helpRequests.findMany({
            where : {
                status
            }
        });
    }

    async getHelpRequestById(Id?: string) {
        return this.prisma.helpRequests.findMany({
            where : {
                id : Id
            }
        });
    }

    async updateToHelpRequest(id: string, body: UpdateHelpStatusDto) {
        try {
            const volunteer = await this.prisma.helpRequests.update({
                where: { id },
                data: body,
            });
            return volunteer;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Volunteer not found');
                }
                if (error.code === 'P2023') {
                    throw new BadRequestException('Invalid volunteer ID format');
                }
            }
            throw error;
        }
    }
}
