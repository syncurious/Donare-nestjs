import { IsBoolean, isDate, IsNotEmpty, IsNumber ,IsDate} from "class-validator";

export class UserPreferencesDto {
    @IsDate()
    @IsNotEmpty()
    lastZakatDate: Date;
    
    @IsBoolean()
    @IsNotEmpty()
    receiveZakatRemainder: boolean;
  
    @IsBoolean() 
    @IsNotEmpty()
    stayUpdatedOnNewCampaigns: boolean;
  
  }