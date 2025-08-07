import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import { ResponseService } from '../common/services/response.service';
import {
  CreateDonationDto,
  DonationResponseDto,
  UpdateDonationDto,
  DonationType,
  ZakatDonationDto,
  FitrahDonationDto,
  SadaqahDonationDto,
  OtherDonationDto,
} from './dto/donation.dto';

@Injectable()
export class DonationService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService
  ) { }

  async createDonation(userId: string, donationDto: CreateDonationDto): Promise<DonationResponseDto> {
    // Validate donation in kind requirements
    this.validateDonationInKind(donationDto);

    // Type-safe handling based on donation type
    switch (donationDto.donationType) {
      case DonationType.ZAKAT:
        return this.createZakatDonation(userId, donationDto as ZakatDonationDto);

      case DonationType.FITRAH:
        return this.createFitrahDonation(userId, donationDto as FitrahDonationDto);

      case DonationType.SADAQAH:
        return this.createSadaqahDonation(userId, donationDto as SadaqahDonationDto);

      case DonationType.OTHER:
        return this.createOtherDonation(userId, donationDto as OtherDonationDto);

      default:
        throw new Error(`Unsupported donation type: ${(donationDto as any).donationType}`);
    }
  }

  async getAllDonations(type?: DonationType) {
    return this.prisma.donations.findMany({
      where: {
        donationType : type
      }
    });
  }

  async getDonationsById(Id?: string) {
    return this.prisma.donations.findMany({
      where: {
        id: Id
      }
    });
  }

  private validateDonationInKind(donationDto: CreateDonationDto): void {
    const isInKind = donationDto.isInKind || false;

    if (isInKind) {
      // For in-kind donations, validate required fields
      if (!donationDto.itemName) {
        throw new BadRequestException('Item name is required for in-kind donations');
      }
      if (!donationDto.donorName) {
        throw new BadRequestException('Donor name is required for in-kind donations');
      }
      if (!donationDto.donorPhone) {
        throw new BadRequestException('Donor phone is required for in-kind donations');
      }
      if (!donationDto.pickupAddress) {
        throw new BadRequestException('Pickup address is required for in-kind donations');
      }
      if (!donationDto.itemImage) {
        throw new BadRequestException('Item image is required for in-kind donations');
      }
    } else {
      // For monetary donations, validate amount is provided
      if (!donationDto.amount || donationDto.amount <= 0) {
        throw new BadRequestException('Amount is required for monetary donations');
      }
    }
  }

  private async createZakatDonation(userId: string, dto: ZakatDonationDto): Promise<DonationResponseDto> {
    const donation = await this.prisma.donations.create({
      data: {
        userId,
        amount: dto.amount || null,
        donationType: dto.donationType,
        description: dto.description,
        zakatYear: dto.zakatYear,
        zakatCalculationMethod: dto.zakatCalculationMethod,
        zakatAssetsValue: dto.zakatAssetsValue,
        transactionId: dto.transactionId,
        paymentMethod: dto.paymentMethod,
        // Donation in kind fields
        isInKind: dto.isInKind || false,
        itemName: dto.itemName,
        itemImage: dto.itemImage,
        donorName: dto.donorName,
        donorPhone: dto.donorPhone,
        pickupAddress: dto.pickupAddress,
      },
    });

    return this.mapToResponseDto(donation);
  }

  private async createFitrahDonation(userId: string, dto: FitrahDonationDto): Promise<DonationResponseDto> {
    const donation = await this.prisma.donations.create({
      data: {
        userId,
        amount: dto.amount || null,
        donationType: dto.donationType,
        description: dto.description,
        fitrahYear: dto.fitrahYear,
        fitrahCalculationMethod: dto.fitrahCalculationMethod,
        fitrahAmount: dto.fitrahAmount,
        transactionId: dto.transactionId,
        paymentMethod: dto.paymentMethod,
        // Donation in kind fields
        isInKind: dto.isInKind || false,
        itemName: dto.itemName,
        itemImage: dto.itemImage,
        donorName: dto.donorName,
        donorPhone: dto.donorPhone,
        pickupAddress: dto.pickupAddress,
      },
    });

    return this.mapToResponseDto(donation);
  }

  private async createSadaqahDonation(userId: string, dto: SadaqahDonationDto): Promise<DonationResponseDto> {
    const donation = await this.prisma.donations.create({
      data: {
        userId,
        amount: dto.amount || null,
        donationType: dto.donationType,
        description: dto.description,
        transactionId: dto.transactionId,
        paymentMethod: dto.paymentMethod,
        // Donation in kind fields
        isInKind: dto.isInKind || false,
        itemName: dto.itemName,
        itemImage: dto.itemImage,
        donorName: dto.donorName,
        donorPhone: dto.donorPhone,
        pickupAddress: dto.pickupAddress,
      },
    });

    return this.mapToResponseDto(donation);
  }

  private async createOtherDonation(userId: string, dto: OtherDonationDto): Promise<DonationResponseDto> {
    const donation = await this.prisma.donations.create({
      data: {
        userId,
        amount: dto.amount || null,
        donationType: dto.donationType,
        description: dto.description,
        transactionId: dto.transactionId,
        paymentMethod: dto.paymentMethod,
        // Donation in kind fields
        isInKind: dto.isInKind || false,
        itemName: dto.itemName,
        itemImage: dto.itemImage,
        donorName: dto.donorName,
        donorPhone: dto.donorPhone,
        pickupAddress: dto.pickupAddress,
      },
    });

    return this.mapToResponseDto(donation);
  }

  async getDonationsByUser(userId: string): Promise<DonationResponseDto[]> {
    const donations = await this.prisma.donations.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return donations.map(donation => this.mapToResponseDto(donation));
  }

  async getDonationById(id: string): Promise<DonationResponseDto> {
    const donation = await this.prisma.donations.findUnique({
      where: { id },
    });

    if (!donation) {
      throw new NotFoundException('Donation not found');
    }

    return this.mapToResponseDto(donation);
  }

  async updateDonation(id: string, updateDto: UpdateDonationDto): Promise<DonationResponseDto> {
    try {
      const donation = await this.prisma.donations.update({
        where: { id },
        data: updateDto,
      });

      return this.mapToResponseDto(donation);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Donation not found');
      }
      throw error;
    }
  }

  async deleteDonation(id: string): Promise<void> {
    try {
      await this.prisma.donations.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Donation not found');
      }
      throw error;
    }
  }

  // Helper method to map Prisma model to response DTO
  private mapToResponseDto(donation: any): DonationResponseDto {
    return {
      id: donation.id,
      userId: donation.userId,
      amount: donation.amount,
      donationType: donation.donationType,
      status: donation.status,
      description: donation.description,
      // Donation in kind fields
      isInKind: donation.isInKind,
      itemName: donation.itemName,
      itemImage: donation.itemImage,
      donorName: donation.donorName,
      donorPhone: donation.donorPhone,
      pickupAddress: donation.pickupAddress,
      zakatYear: donation.zakatYear,
      zakatCalculationMethod: donation.zakatCalculationMethod,
      zakatAssetsValue: donation.zakatAssetsValue,
      fitrahYear: donation.fitrahYear,
      fitrahCalculationMethod: donation.fitrahCalculationMethod,
      fitrahAmount: donation.fitrahAmount,
      transactionId: donation.transactionId,
      paymentMethod: donation.paymentMethod,
      paymentStatus: donation.paymentStatus,
      createdAt: donation.createdAt,
      updatedAt: donation.updatedAt,
    };
  }
}
