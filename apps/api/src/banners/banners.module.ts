import { Module } from '@nestjs/common';
import { BannersController } from './banners.controller';
import { DBModule } from '../db/db.module';

@Module({
  controllers: [BannersController],
  imports: [DBModule],
})
export class BannersModule {}
