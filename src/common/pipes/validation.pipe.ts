import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('Value is required');
    }
    
    // Add your custom validation logic here
    return value;
  }
} 