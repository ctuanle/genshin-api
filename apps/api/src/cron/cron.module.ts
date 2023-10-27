import { Module } from '@nestjs/common';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';
import { DBModule } from '../db/db.module';

@Module({
  controllers: [CronController],
  imports: [DBModule],
  providers: [CronService],
})
export class CronModule {}
