import { Module } from '@nestjs/common';
import { CausesService } from './causes.service';
import { CausesController } from './causes.controller';
import { CausesService } from './causes.service';

@Module({
  providers: [CausesService],
  controllers: [CausesController]
})
export class CausesModule {}
