import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPositivePipe implements PipeTransform<string, number> {
  private readonly optional: boolean;

  constructor(optional?: true) {
    this.optional = optional;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata): number | undefined {
    if (value === undefined && this.optional) {
      return undefined;
    }
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('expected a valid number');
    }

    if (val < 1) {
      throw new BadRequestException('must be a positive number');
    }
    return val;
  }
}
