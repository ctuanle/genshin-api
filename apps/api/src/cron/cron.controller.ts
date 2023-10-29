import { Controller, Get } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller({
  path: 'cron',
  version: '1',
})
export class CronController {
  constructor(private cronService: CronService) {}

  @Get('get_char_links')
  getCharLink() {
    return this.cronService.getCharLinks();
  }

  @Get('get_char_info')
  getCharInfo() {
    return this.cronService.getCharInfo(
      'https://genshin-impact.fandom.com/wiki/Traveler',
    );
  }

  @Get('get_char_voice_actors')
  getCharVoiceActors() {
    return this.cronService.getCharVoiceActors(
      'https://genshin-impact.fandom.com/wiki/Amber',
    );
  }
}
