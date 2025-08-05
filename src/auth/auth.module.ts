import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseModule } from '../config/supabase/supabase.module';
import { CommonModule } from '../common/common.module';
import { PrismaModule } from '../config/prisma/prisma.module';

@Module({
  imports: [SupabaseModule, CommonModule, PrismaModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
