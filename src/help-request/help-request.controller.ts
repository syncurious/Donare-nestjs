import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { HelpRequestService } from './help-request.service';
import { CreateHelpRequestDto, UpdateHelpStatusDto } from './dto/help-request.dto';
import { ResponseService } from 'src/common/services/response.service';
import { Status } from 'generated/prisma';

@Controller('help-request')
export class HelpRequestController {
    constructor(
        private readonly helpRequestService: HelpRequestService,
        private readonly responseService: ResponseService,
    ) { }

    @Post()
    async createHelpRequest(@Req() req, @Body() createHelpRequestDto: CreateHelpRequestDto) {
        if (!req.user || !req.user.userId) {
            throw new NotFoundException('User not authenticated');
        }
        const userId = req.user.userId;
        const helpRequest = await this.helpRequestService.createHelpRequest(createHelpRequestDto, userId);
        return this.responseService.formatResponse(helpRequest, 'Help request created successfully', true, HttpStatus.CREATED);
    }

    @Get()
    async getHelpRequests(@Req() req) {
        if (!req.user || !req.user.userId) {
            throw new NotFoundException('User not authenticated');
        }
        const userId = req.user.userId;
        const helpRequests = await this.helpRequestService.getHelpRequests(userId);
        return this.responseService.formatResponse(helpRequests, 'Help requests fetched successfully', true, HttpStatus.OK);
    }

    @Get('admin/all')
    async getAllHelpRequests(@Query('status') status: string) {
        if (status) {
            const validStatuses = Object.values(Status);
            if (!validStatuses.includes(status as Status)) {
                throw new NotFoundException('Invalid status value');
            }
        }
        const helpRequests = await this.helpRequestService.getAllHelpRequests(status as Status);
        return this.responseService.formatResponse(helpRequests, 'Help requests fetched successfully', true, HttpStatus.OK);
    }

    @Get('admin/:id')
    async getHelpRequestById(@Param('id') id: string) {
        const helpRequest = await this.helpRequestService.getHelpRequestById(id);
        return this.responseService.formatResponse(helpRequest, 'Help request fetched successfully', true, HttpStatus.OK);
    }
    @Patch('admin/:id')
    async updateToVolunteer(@Param('id') id: string, @Body() body: UpdateHelpStatusDto) {
        const response = await this.helpRequestService.updateToHelpRequest(id, body)
        if (!response) {
            throw new NotFoundException('Volunteer not found');
        }
        return this.responseService.formatResponse(
            response,
            'Success',
            true,
            HttpStatus.OK
        );
    }

}
