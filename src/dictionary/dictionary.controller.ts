import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { Public } from '@/common/public/public.decorator'

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionaryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.dictionaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictionaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictionaryDto: UpdateDictionaryDto) {
    return this.dictionaryService.update(+id, updateDictionaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictionaryService.remove(+id);
  }

  @Get("/parentDict/list")
  getParentDictList() {
    return this.dictionaryService.findAllParent();
  }


  @Get("/parentDict/:id")
  getParentDict(@Param("id") id: number) {
    return this.dictionaryService.findAllChild(id);
  }
}
