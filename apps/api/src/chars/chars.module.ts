import { Module } from '@nestjs/common';
import { CharsController } from './chars.controller';
import { DBModule } from '../db/db.module';
import { CharsService } from './chars.service';

@Module({
  controllers: [CharsController],
  imports: [DBModule],
  providers: [CharsService],
})
export class CharsModule {}
