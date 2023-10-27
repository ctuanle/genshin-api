import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseLangPipe implements PipeTransform<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata): string {
    if (value === undefined) {
      return 'en';
    }

    if (!['en', 'fr', 'vn'].includes(value)) {
      throw new BadRequestException('unsupported language');
    }
    return value;
  }
}
