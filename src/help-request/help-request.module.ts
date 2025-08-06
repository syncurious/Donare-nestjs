import { Module } from '@nestjs/common';
import { HelpRequestController } from './help-request.controller';
import { HelpRequestService } from './help-request.service';

@Module({
  controllers: [HelpRequestController],
  providers: [HelpRequestService]
})
export class HelpRequestModule {}
