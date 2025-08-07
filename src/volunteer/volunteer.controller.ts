import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { RegisterVolunteerDto, UpdateVolunteerDto, VolunteerIdDto } from './dto/volunteer.dto';
import { ResponseService } from 'src/common/services/response.service';
import { Status } from 'generated/prisma/client';

@Controller('volunteer')
export class VolunteerController {
    constructor(
        private readonly volunteerService: VolunteerService,
        private readonly res: ResponseService

    ) { }

    @Post('register')
    async registerVolunteer(@Request() req, @Body() body: RegisterVolunteerDto) {
        if (!req.user || !req.user.userId) {
            throw new NotFoundException('User not authenticated');
        }
        const userId = req.user.userId
        const response = await this.volunteerService.registerVolunteer(body, userId)
        return this.res.formatResponse(
            response,
            'Success',
            true,
            HttpStatus.CREATED
        );
    }

    @Get()
    async getMyForm(@Request() req) {
        if (!req.user || !req.user.userId) {
            throw new NotFoundException('User not authenticated');
        }
        const userId = req.user.userId
        const response = await this.volunteerService.getMyForm(userId)
        return this.res.formatResponse(
            response,
            'Success',
            true,
            HttpStatus.OK
        );
    }

    @Get('admin/all')
    async getAllVolunteers(@Query('status') status: string) {
        if (status) {
            const validStatuses = Object.values(Status);
            if (!validStatuses.includes(status as Status)) {
                throw new NotFoundException('Invalid status value');
            }
        }
        const response = await this.volunteerService.getAllVolunteers(status as Status)
        return this.res.formatResponse(
            response,
            'Success',
            true,
            HttpStatus.OK
        );

    }

    @Get('admin/all/:id')
    async getVolunteerById(@Param('id') id: string) {
        const response = await this.volunteerService.getVolunteerById(id)
        return this.res.formatResponse(
            response,
            'Success',
            true,
            HttpStatus.OK
        );
    }
    @Patch('admin/:id')
    async updateToVolunteer(@Param('id') id: string, @Body() body: UpdateVolunteerDto) {
        const response = await this.volunteerService.updateToVolunteer(id, body)
        if (!response) {
            throw new NotFoundException('Volunteer not found');
        }
        return this.res.formatResponse(
            response,
            'Success',
            true,
            HttpStatus.OK
        );
    }
}
