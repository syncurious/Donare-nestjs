import { Module } from '@nestjs/common';
import { CausesService } from './causes.service';
import { CausesController } from './causes.controller';
import { ResponseService } from 'src/common/services/response.service';

@Module({
  providers: [CausesService, ResponseService],
  controllers: [CausesController]
})
export class CausesModule {}
