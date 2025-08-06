import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateCauseDto } from './dto/causes.dto';

@Injectable()
export class CausesService {
    constructor(private readonly prisma: PrismaService) {}

    async createCause(createCauseDto: CreateCauseDto, userId: string) {
        return this.prisma.causes.create({ data: { ...createCauseDto, userId: userId } });
    }

    async getCauses(userId: string) {
        return this.prisma.causes.findMany({ where: { userId } });
    }

    async getCauseById(id: string) {
        return this.prisma.causes.findUnique({ where: { id } });
    }
}
