import { IsString } from "class-validator";
import { MediaType } from "generated/prisma";

export class CreateCauseDto {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsString()
    media: string;
    @IsString()
    mediaType: MediaType;
}