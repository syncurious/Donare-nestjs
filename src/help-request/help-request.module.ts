import { Module } from '@nestjs/common';
import { HelpRequestController } from './help-request.controller';
import { HelpRequestService } from './help-request.service';
import { ResponseService } from 'src/common/services/response.service';

@Module({
  controllers: [HelpRequestController],
  providers: [HelpRequestService, ResponseService]
})
export class HelpRequestModule { }
