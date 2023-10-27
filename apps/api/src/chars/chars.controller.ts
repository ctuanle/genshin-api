import { Controller, Get, Param, Query } from '@nestjs/common';
import { CharsService } from './chars.service';
import { ParseIntPositivePipe } from '../shared/pipes/parse-int-positive.pipe';
import { ParseLangPipe } from '../shared/pipes/parse-language.pipe';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Language } from '../shared/types';
import { GetAllCharsReq, GetAllCharsRes } from './dtos/get-chars.dto';

const prefix = 'c';

@ApiTags('characters')
@Controller({
  version: '1',
  path: prefix,
})
export class CharsController {
  constructor(private readonly charsSrv: CharsService) {}

  @ApiOkResponse({
    description: 'list of characters',
    type: GetAllCharsRes,
    isArray: true,
  })
  @Get()
  async getAllChars(@Query() query: GetAllCharsReq) {
    // Returning a list of characters information.
    // By default, first 10 characters will be sent, sort by ID (ascending).
    return this.charsSrv.getAllChar(query.page);
  }

  @ApiOperation({ summary: 'get one character by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'lang', enum: Language, required: false })
  @Get(':id')
  getCharacter(
    @Param('id', new ParseIntPositivePipe()) id: number,
    @Query('lang', ParseLangPipe) lang: string,
  ) {
    return this.charsSrv.getCharInfoById(id, lang);
  }

  @Get('search')
  searchChars() {
    return {
      characters: [],
      meta: {},
    };
  }

  @Get(':id/media')
  getCharMedia() {
    return {
      media: {
        videos: [],
        cameos: [],
        artworks: [],
        birthday: [],
      },
    };
  }

  @Get(':id/voices')
  getCharVoices() {
    return {
      voices: {
        videos: [],
        cameos: [],
        artworks: [],
        birthday: [],
      },
    };
  }
}
