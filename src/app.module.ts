import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './config/supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { CommonModule } from './common/common.module';
import { DonationModule } from './donation/donation.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { HelpRequestModule } from './help-request/help-request.module';
import { CausesModule } from './causes/causes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule, 
    AuthModule, 
    PrismaModule,
    UserModule,
    CommonModule,
    DonationModule,
    VolunteerModule,
    HelpRequestModule,
    CausesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'donations', method: RequestMethod.ALL },
        { path: 'donations/*', method: RequestMethod.ALL },
        { path: 'user', method: RequestMethod.ALL },
        { path: 'user/*', method: RequestMethod.ALL },
        { path: 'volunteer', method: RequestMethod.ALL },
        { path: 'volunteer/*', method: RequestMethod.ALL },
        { path: 'help-request', method: RequestMethod.ALL },
        { path: 'help-request/*', method: RequestMethod.ALL }
      );
  }
}
