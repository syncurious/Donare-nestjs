import { Test, TestingModule } from '@nestjs/testing';
import { DonationService } from './donation.service';
import { PrismaService } from '../config/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { DonationType, ZakatCalculationMethod } from './dto/donation.dto';

describe('DonationService', () => {
  let service: DonationService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    donations: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DonationService>(DonationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDonation', () => {
    it('should create a monetary zakat donation successfully', async () => {
      const donationDto = {
        donationType: DonationType.ZAKAT as const,
        amount: 2500,
        description: 'Zakat payment',
        zakatYear: 2024,
        zakatCalculationMethod: ZakatCalculationMethod.GOLD,
        zakatAssetsValue: 100000,
        isInKind: false,
      };

      const expectedResult = {
        id: 'test-id',
        userId: 'user-id',
        amount: 2500,
        donationType: DonationType.ZAKAT,
        status: 'COMPLETED',
        isInKind: false,
        // ... other fields
      };

      mockPrismaService.donations.create.mockResolvedValue(expectedResult);

      const result = await service.createDonation('user-id', donationDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.donations.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-id',
          amount: 2500,
          donationType: DonationType.ZAKAT,
          description: 'Zakat payment',
          zakatYear: 2024,
          zakatCalculationMethod: ZakatCalculationMethod.GOLD,
          zakatAssetsValue: 100000,
          transactionId: undefined,
          paymentMethod: undefined,
          isInKind: false,
          itemName: undefined,
          itemImage: undefined,
          donorName: undefined,
          donorPhone: undefined,
          pickupAddress: undefined,
        },
      });
    });

    it('should create an in-kind sadaqah donation successfully', async () => {
      const donationDto = {
        donationType: DonationType.SADAQAH as const,
        description: 'Clothing donation',
        isInKind: true,
        itemName: 'Winter Clothes',
        itemImage: 'https://example.com/image.jpg',
        donorName: 'John Doe',
        donorPhone: '+1234567890',
        pickupAddress: '123 Main St, City, State',
      };

      const expectedResult = {
        id: 'test-id',
        userId: 'user-id',
        amount: null,
        donationType: DonationType.SADAQAH,
        status: 'COMPLETED',
        isInKind: true,
        itemName: 'Winter Clothes',
        itemImage: 'https://example.com/image.jpg',
        donorName: 'John Doe',
        donorPhone: '+1234567890',
        pickupAddress: '123 Main St, City, State',
        // ... other fields
      };

      mockPrismaService.donations.create.mockResolvedValue(expectedResult);

      const result = await service.createDonation('user-id', donationDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.donations.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-id',
          amount: null,
          donationType: DonationType.SADAQAH,
          description: 'Clothing donation',
          transactionId: undefined,
          paymentMethod: undefined,
          isInKind: true,
          itemName: 'Winter Clothes',
          itemImage: 'https://example.com/image.jpg',
          donorName: 'John Doe',
          donorPhone: '+1234567890',
          pickupAddress: '123 Main St, City, State',
        },
      });
    });

    it('should throw BadRequestException for in-kind donation without required fields', async () => {
      const donationDto = {
        donationType: DonationType.SADAQAH as const,
        description: 'Clothing donation',
        isInKind: true,
        // Missing required fields: itemName, itemImage, donorName, donorPhone, pickupAddress
      };

      await expect(service.createDonation('user-id', donationDto)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should throw BadRequestException for monetary donation without amount', async () => {
      const donationDto = {
        donationType: DonationType.SADAQAH as const,
        description: 'Charity donation',
        isInKind: false,
        // Missing amount
      };

      await expect(service.createDonation('user-id', donationDto)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should throw BadRequestException for monetary donation with zero amount', async () => {
      const donationDto = {
        donationType: DonationType.SADAQAH as const,
        amount: 0,
        description: 'Charity donation',
        isInKind: false,
      };

      await expect(service.createDonation('user-id', donationDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('getDonationsByUser', () => {
    it('should return user donations', async () => {
      const mockDonations = [
        {
          id: 'donation-1',
          userId: 'user-id',
          amount: 100,
          donationType: DonationType.SADAQAH,
          isInKind: false,
        },
        {
          id: 'donation-2',
          userId: 'user-id',
          amount: null,
          donationType: DonationType.SADAQAH,
          isInKind: true,
          itemName: 'Clothes',
        },
      ];

      mockPrismaService.donations.findMany.mockResolvedValue(mockDonations);

      const result = await service.getDonationsByUser('user-id');

      expect(result).toHaveLength(2);
      expect(mockPrismaService.donations.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-id' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
