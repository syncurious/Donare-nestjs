import { Body, Controller, Get, HttpStatus, NotFoundException, Post, Request } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { RegisterVolunteerDto } from './dto/volunteer.dto';
import { ResponseService } from 'src/common/services/response.service';

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
}
