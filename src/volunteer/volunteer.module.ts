import { Module } from '@nestjs/common';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { ResponseService } from 'src/common/services/response.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [VolunteerController],
  providers: [VolunteerService ,ResponseService, PrismaService]
})
export class VolunteerModule { }
