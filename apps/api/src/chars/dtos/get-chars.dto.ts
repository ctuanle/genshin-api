import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Vision, Weapon } from '../../shared/types';

export class GetAllCharsReq {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page: number;

  @ApiPropertyOptional({
    minimum: 1,
    default: 10,
    description: 'current not supported',
    type: Number,
  })
  @IsOptional()
  @IsPositive()
  limit: number;
}

// https://stackoverflow.com/questions/60749439/circular-dependency-with-nestjs-swagger-4
export class CharSimple {
  /**
   * Yahooo
   */
  @ApiProperty({ minimum: 1 })
  id: number;

  @ApiProperty({ example: 'Amber' })
  name: string;

  @ApiProperty({ enum: [4, 5] })
  rarity: 4 | 5;

  @ApiProperty({ enum: Weapon })
  weapon: Weapon;

  @ApiProperty({ enum: Vision })
  vision: Vision;
}

class MetaData {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ default: 10 })
  limit: number;

  @ApiProperty({ default: ['release_date', 'id'] })
  order_by: string[];
}

export class GetAllCharsRes {
  @ApiProperty({ type: () => [CharSimple] })
  characters: CharSimple[];

  @ApiProperty({ type: () => MetaData })
  meta: MetaData;
}
