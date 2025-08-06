import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { CreateCauseDto } from './dto/causes.dto';
import { ResponseService } from 'src/common/services/response.service';
import { CausesService } from './causes.service';

@Controller('causes')
export class CausesController {
    constructor(private readonly causesService: CausesService, private readonly responseService: ResponseService) {}

    @Post()
    async createCause(@Body() createCauseDto: CreateCauseDto, @Req() req) {
        if (!req.user || !req.user.userId) {
            throw new NotFoundException('User not authenticated');
        }
        const userId = req.user.userId;
        const cause = await this.causesService.createCause(createCauseDto, userId);
        return this.responseService.formatResponse(cause, 'Cause created successfully', true, HttpStatus.CREATED);
    }

    @Get()
    async getCauses(@Req() req) {
        if (!req.user || !req.user.userId) {
            throw new NotFoundException('User not authenticated');
        }
        const userId = req.user.userId;
        const causes = await this.causesService.getCauses(userId);
        return this.responseService.formatResponse(causes, 'Causes fetched successfully', true, HttpStatus.OK);
    }

    @Get(':id')
    async getCauseById(@Param('id') id: string) {
        const cause = await this.causesService.getCauseById(id);
        return this.responseService.formatResponse(cause, 'Cause fetched successfully', true, HttpStatus.OK);
    }
}
