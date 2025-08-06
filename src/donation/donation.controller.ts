import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Request,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { 
  CreateDonationDto, 
  DonationResponseDto, 
  UpdateDonationDto,
  DonationType 
} from './dto/donation.dto';
import { CustomValidationPipe } from '../common/pipes/validation.pipe';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createDonation(
    @Request() req,
    @Body() donationDto: CreateDonationDto
  ): Promise<DonationResponseDto> {
    const userId = req.user.userId;
    return this.donationService.createDonation(userId, donationDto);
  }

  @Get()
  async getMyDonations(@Request() req): Promise<DonationResponseDto[]> {
    const userId = req['user']['userId'];
    return this.donationService.getDonationsByUser(userId);
  }

  @Get(':id')
  async getDonationById(@Param('id') id: string): Promise<DonationResponseDto> {
    return this.donationService.getDonationById(id);
  }

  @Put(':id')
  async updateDonation(
    @Param('id') id: string,
    @Body() updateDto: UpdateDonationDto
  ): Promise<DonationResponseDto> {
    return this.donationService.updateDonation(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDonation(@Param('id') id: string): Promise<void> {
    return this.donationService.deleteDonation(id);
  }

  // Example endpoints for specific donation types (optional)
  @Post('zakat')
  @HttpCode(HttpStatus.CREATED)
  async createZakatDonation(
    @Request() req,
    @Body(new CustomValidationPipe()) donationDto: CreateDonationDto
  ): Promise<DonationResponseDto> {
    if (donationDto.donationType !== DonationType.ZAKAT) {
      throw new Error('This endpoint is only for Zakat donations');
    }
    const userId = req.user.userId;
    return this.donationService.createDonation(userId, donationDto);
  }

  @Post('sadaqah')
  @HttpCode(HttpStatus.CREATED)
  async createSadaqahDonation(
    @Request() req,
    @Body(new CustomValidationPipe()) donationDto: CreateDonationDto
  ): Promise<DonationResponseDto> {
    if (donationDto.donationType !== DonationType.SADAQAH) {
      throw new Error('This endpoint is only for Sadaqah donations');
    }
    const userId = req.user.userId;
    return this.donationService.createDonation(userId, donationDto);
  }

  @Post('fitrah')
  @HttpCode(HttpStatus.CREATED)
  async createFitrahDonation(
    @Request() req,
    @Body(new CustomValidationPipe()) donationDto: CreateDonationDto
  ): Promise<DonationResponseDto> {
    if (donationDto.donationType !== DonationType.FITRAH) {
      throw new Error('This endpoint is only for Fitrah donations');
    }
    const userId = req.user.userId;
    return this.donationService.createDonation(userId, donationDto);
  }
}
