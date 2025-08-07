import { IsEnum, IsNumber, IsOptional, IsString, IsInt, Min, Max, IsEmpty, IsBoolean, IsUrl, IsPhoneNumber, IsNotEmpty } from 'class-validator';
import { Status } from 'generated/prisma';

export enum DonationType {
  ZAKAT = 'ZAKAT',
  SADAQAH = 'SADAQAH',
  FITRAH = 'FITRAH',
  CAMPAIGN = 'CAMPAIGN',
  OTHER = 'OTHER'
}

export enum ZakatCalculationMethod {
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  CASH = 'CASH',
  INVESTMENTS = 'INVESTMENTS',
  BUSINESS = 'BUSINESS',
  OTHER = 'OTHER'
}

export enum FitrahCalculationMethod {
  DATES = 'DATES',
  WHEAT = 'WHEAT',
  BARLEY = 'BARLEY',
  RAISINS = 'RAISINS',
  CASH = 'CASH'
}

// Base donation DTO with common fields
export class BaseDonationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  amount?: number;

  @IsEnum(DonationType)
  donationType: DonationType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  // Donation in kind fields
  @IsOptional()
  @IsBoolean()
  isInKind?: boolean;

  @IsOptional()
  @IsString()
  itemName?: string;

  @IsOptional()
  @IsUrl()
  itemImage?: string;

  @IsOptional()
  @IsString()
  donorName?: string;

  @IsOptional()
  @IsString()
  donorPhone?: string;

  @IsOptional()
  @IsString()
  pickupAddress?: string;
}

// Zakat specific DTO
export class ZakatDonationDto extends BaseDonationDto {
  declare donationType: DonationType.ZAKAT;

  @IsInt()
  @Min(2020)
  @Max(2030)
  zakatYear: number;

  @IsEmpty()
  @IsEnum(ZakatCalculationMethod)
  zakatCalculationMethod: ZakatCalculationMethod;

  @IsNumber()
  @Min(0)
  zakatAssetsValue: number;
}

// Fitrah specific DTO
export class FitrahDonationDto extends BaseDonationDto {
  declare donationType: DonationType.FITRAH;

  @IsInt()
  @Min(2020)
  @Max(2030)
  fitrahYear: number;

  @IsEnum(FitrahCalculationMethod)
  fitrahCalculationMethod: FitrahCalculationMethod;

  @IsNumber()
  @Min(0)
  fitrahAmount: number;
}

// Sadaqah specific DTO (simple, no additional fields)
export class SadaqahDonationDto extends BaseDonationDto {
  declare donationType: DonationType.SADAQAH;
}

// Other donation DTO
export class OtherDonationDto extends BaseDonationDto {
  declare donationType: DonationType.OTHER;
}

// Union type for all donation DTOs
export type CreateDonationDto = 
  | ZakatDonationDto 
  | FitrahDonationDto 
  | SadaqahDonationDto
  | OtherDonationDto;

// Response DTO
export class DonationResponseDto {
  id: string;
  userId: string;
  amount?: number;
  donationType: DonationType;
  status: string;
  description?: string;
  
  // Donation in kind fields
  isInKind: boolean;
  itemName?: string;
  itemImage?: string;
  donorName?: string;
  donorPhone?: string;
  pickupAddress?: string;
  
  zakatYear?: number;
  zakatCalculationMethod?: ZakatCalculationMethod;
  zakatAssetsValue?: number;
  fitrahYear?: number;
  fitrahCalculationMethod?: FitrahCalculationMethod;
  fitrahAmount?: number;
  transactionId?: string;
  paymentMethod?: string;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

// Update DTO (partial)
export class UpdateDonationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  // Donation in kind fields
  @IsOptional()
  @IsBoolean()
  isInKind?: boolean;

  @IsOptional()
  @IsString()
  itemName?: string;

  @IsOptional()
  @IsUrl()
  itemImage?: string;

  @IsOptional()
  @IsString()
  donorName?: string;

  @IsOptional()
  @IsString()
  donorPhone?: string;

  @IsOptional()
  @IsString()
  pickupAddress?: string;
}