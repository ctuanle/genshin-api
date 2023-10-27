import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CronModule } from './cron/cron.module';
import { BannersModule } from './banners/banners.module';
import { CharsModule } from './chars/chars.module';
import { DBModule } from './db/db.module';

@Module({
  imports: [CronModule, BannersModule, CharsModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
