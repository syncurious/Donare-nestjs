import { Module } from '@nestjs/common';
import { EncryptionService } from './services/encryption.service';
import { TokenService } from './services/token.service';
import { EnvConfigService } from './config/env.config';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CustomValidationPipe } from './pipes/validation.pipe';

@Module({
  providers: [
    EncryptionService,
    TokenService,
    EnvConfigService,
    LoggingInterceptor,
    AuthGuard,
    CustomValidationPipe,
  ],
  exports: [
    EncryptionService,
    TokenService,
    EnvConfigService,
    LoggingInterceptor,
    AuthGuard,
    CustomValidationPipe,
  ],
})
export class CommonModule {} 