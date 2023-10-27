import { Controller } from '@nestjs/common';
import { DBService } from '../db/db.service';

const prefix = 'b';

@Controller({
  path: prefix,
  version: '1',
})
export class BannersController {
  constructor(private readonly dbService: DBService) {}
}
