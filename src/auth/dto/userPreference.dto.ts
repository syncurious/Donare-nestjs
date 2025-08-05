import { IsBoolean, IsNotEmpty, IsDateString } from "class-validator";

export class UserPreferencesDto {
    @IsDateString()
    @IsNotEmpty()
    lastZakatDate: string;
    
    @IsBoolean()
    @IsNotEmpty()
    receiveZakatRemainder: boolean;
  
    @IsBoolean() 
    @IsNotEmpty()
    stayUpdatedOnNewCampaigns: boolean;
  
  }