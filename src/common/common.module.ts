import { Module } from '@nestjs/common';
import { EncryptionService } from './services/encryption.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CustomValidationPipe } from './pipes/validation.pipe';

@Module({
  providers: [
    EncryptionService,
    LoggingInterceptor,
    AuthGuard,
    CustomValidationPipe,
  ],
  exports: [
    EncryptionService,
    LoggingInterceptor,
    AuthGuard,
    CustomValidationPipe,
  ],
})
export class CommonModule {} 