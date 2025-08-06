import { Body, Controller, Get, HttpStatus, NotFoundException, Post, Req } from '@nestjs/common';
import { HelpRequestService } from './help-request.service';
import { CreateHelpRequestDto } from './dto/help-request.dto';
import { ResponseService } from 'src/common/services/response.service';

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

}
