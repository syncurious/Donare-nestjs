import { Module } from '@nestjs/common';
import { EncryptionService } from './services/encryption.service';
import { TokenService } from './services/token.service';
import { EnvConfigService } from './config/env.config';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { ResponseService } from './services/response.service';

@Module({
  providers: [
    EncryptionService,
    TokenService,
    EnvConfigService,
    LoggingInterceptor,
    AuthGuard,
    CustomValidationPipe,
    ResponseService,
  ],
  exports: [
    EncryptionService,
    TokenService,
    EnvConfigService,
    LoggingInterceptor,
    AuthGuard,
    CustomValidationPipe,
    ResponseService,
  ],
})
export class CommonModule {} 