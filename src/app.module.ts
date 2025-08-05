import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './config/supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule, 
    AuthModule, 
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user/(.*)', method: RequestMethod.ALL }
      );
  }
}
