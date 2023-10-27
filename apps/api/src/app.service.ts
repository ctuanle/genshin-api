import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      quote: {
        title: 'Welcome to Genshin API, travelers!',
        content:
          'You and I are both travelers from another world. That our paths have crossed here is no accident, but the will of fate.',
        author: 'Fischl - Prinzessin der Verurteilung',
      },
    };
  }

  getHealthcheck() {
    return {
      status: 'available',
    };
  }
}
