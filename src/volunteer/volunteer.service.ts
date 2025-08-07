import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterVolunteerDto, UpdateVolunteerDto } from './dto/volunteer.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Status, Prisma } from 'generated/prisma/client';

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
    
    async getVolunteerById(id: string) {
        try {
            const volunteer = await this.prisma.volunteers.findUnique({
                where: { id },
            });
            
            if (!volunteer) {
                throw new NotFoundException('Volunteer not found');
            }
            
            return volunteer;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2023') {
                    throw new BadRequestException('Invalid volunteer ID format');
                }
            }
            throw error;
        }
    }
    
    async updateToVolunteer(id: string, body: UpdateVolunteerDto) {
        try {
            const volunteer = await this.prisma.volunteers.update({
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
