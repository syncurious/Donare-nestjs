import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterVolunteerDto } from './dto/volunteer.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Status } from 'generated/prisma/client';

@Injectable()
export class VolunteerService {
    constructor (
        private readonly prisma : PrismaService
    ){}
    async registerVolunteer(body: RegisterVolunteerDto, userId: string) {
        const existingVolunteer = await this.prisma.volunteers.findUnique({
            where: { userId },
          });
        
          if (existingVolunteer) {
            throw new BadRequestException('Volunteer already registered with this user ID');
          }
        
        const volunteer = await this.prisma.volunteers.create({
            data: {
                ...body,
                userId,
            },
        });
        return volunteer;
    }
    async getMyForm(userId: string) {
        const volunteer = await this.prisma.volunteers.findUnique({
            where: { userId },
        });
        return volunteer;
    }
    async getAllVolunteers(status: Status) {
        const volunteers = await this.prisma.volunteers.findMany({
            where: { status },
            include: {
                user: true,
            },
        });
        return volunteers;
    }
}
