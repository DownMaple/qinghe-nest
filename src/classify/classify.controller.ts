import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ClassifyService } from './classify.service'
import { CreateClassifyDto } from './dto/create-classify.dto'
import { UpdateClassifyDto } from './dto/update-classify.dto'
import { Public } from '@/common/public/public.decorator'

@Controller('classify')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {
  }

  @Post()
  create(@Body() createClassifyDto: CreateClassifyDto) {
    return this.classifyService.create(createClassifyDto)
  }

  @Public()
  @Get()
  findAll() {
    return this.classifyService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classifyService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassifyDto: UpdateClassifyDto) {
    return this.classifyService.update(+id, updateClassifyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classifyService.remove(+id)
  }

  @Public()
  @Get('/getIndex/list')
  getIndexList() {
    return this.classifyService.getIndexList()
  }

}
