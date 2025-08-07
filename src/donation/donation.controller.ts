import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Request,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import {
  CreateDonationDto,
  UpdateDonationDto,
  DonationType,
} from './dto/donation.dto';
import { ResponseService } from '../common/services/response.service';

@Controller('donations')
export class DonationController {
  constructor(
    private readonly donationService: DonationService,
    private readonly responseService: ResponseService
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createDonation(
    @Request() req,
    @Body() donationDto: CreateDonationDto
  ) {
    if (!req.user || !req.user.userId) {
      throw new NotFoundException('User not authenticated');
    }
    const userId = req.user.userId;
    const donation = await this.donationService.createDonation(userId, donationDto);
    return this.responseService.formatResponse(
      donation,
      'Donation created successfully',
      true,
      HttpStatus.CREATED
    );
  }

  @Get()
  async getMyDonations(@Request() req) {
    if (!req.user || !req.user.userId) {
      throw new NotFoundException('User not authenticated');
    }
    const userId = req.user.userId;
    const donations = await this.donationService.getDonationsByUser(userId);
    return this.responseService.formatResponse(
      donations,
      'Donations retrieved successfully',
      true,
      HttpStatus.OK
    );
  }

  @Get(':id')
  async getDonationById(@Param('id') id: string) {
    const donation = await this.donationService.getDonationById(id);
    return this.responseService.formatResponse(
      donation,
      'Donation retrieved successfully',
      true,
      HttpStatus.OK
    );
  }

  @Put(':id')
  async updateDonation(
    @Param('id') id: string,
    @Body() updateDto: UpdateDonationDto
  ) {
    const donation = await this.donationService.updateDonation(id, updateDto);
    return this.responseService.formatResponse(
      donation,
      'Donation updated successfully',
      true,
      HttpStatus.OK
    );
  }

  @Delete(':id')
  async deleteDonation(@Param('id') id: string) {
    await this.donationService.deleteDonation(id);
    return this.responseService.formatResponse(
      null,
      'Donation deleted successfully',
      true,
      HttpStatus.OK
    );
  }

  // Example endpoints for specific donation types (optional)
  @Post('zakat')
  @HttpCode(HttpStatus.CREATED)
  async createZakatDonation(
    @Request() req,
    @Body() donationDto: CreateDonationDto
  ) {
    if (!req.user || !req.user.userId) {
      throw new NotFoundException('User not authenticated');
    }
    if (donationDto.donationType !== DonationType.ZAKAT) {
      throw new Error('This endpoint is only for Zakat donations');
    }
    const userId = req.user.userId;
    const donation = await this.donationService.createDonation(userId, donationDto);
    return this.responseService.formatResponse(
      donation,
      'Zakat donation created successfully',
      true,
      HttpStatus.CREATED
    );
  }

  @Post('sadaqah')
  @HttpCode(HttpStatus.CREATED)
  async createSadaqahDonation(
    @Request() req,
    @Body() donationDto: CreateDonationDto
  ) {
    if (!req.user || !req.user.userId) {
      throw new NotFoundException('User not authenticated');
    }
    if (donationDto.donationType !== DonationType.SADAQAH) {
      throw new Error('This endpoint is only for Sadaqah donations');
    }
    const userId = req.user.userId;
    const donation = await this.donationService.createDonation(userId, donationDto);
    return this.responseService.formatResponse(
      donation,
      'Sadaqah donation created successfully',
      true,
      HttpStatus.CREATED
    );
  }

  @Post('fitrah')
  @HttpCode(HttpStatus.CREATED)
  async createFitrahDonation(
    @Request() req,
    @Body() donationDto: CreateDonationDto
  ) {
    if (!req.user || !req.user.userId) {
      throw new NotFoundException('User not authenticated');
    }
    if (donationDto.donationType !== DonationType.FITRAH) {
      throw new Error('This endpoint is only for Fitrah donations');
    }
    const userId = req.user.userId;
    const donation = await this.donationService.createDonation(userId, donationDto);
    return this.responseService.formatResponse(
      donation,
      'Fitrah donation created successfully',
      true,
      HttpStatus.CREATED
    );
  }

  @Get('admin/all')
    async getAllHelpRequests(@Query('type') type: string) {
        if (type) {
            const validStatuses = Object.values(DonationType);
            if (!validStatuses.includes(type as DonationType)) {
                throw new NotFoundException('Invalid status value');
            }
        }
        const helpRequests = await this.donationService.getAllDonations(type as DonationType);
        return this.responseService.formatResponse(helpRequests, 'Help requests fetched successfully', true, HttpStatus.OK);
    }

    @Get('admin/:id')
    async getHelpRequestById(@Param('id') id: string) {
        const helpRequest = await this.donationService.getDonationsById(id);
        return this.responseService.formatResponse(helpRequest, 'Help request fetched successfully', true, HttpStatus.OK);
    }
}
