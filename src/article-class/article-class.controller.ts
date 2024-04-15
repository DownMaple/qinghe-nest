import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleClassService } from './article-class.service';
import { CreateArticleClassDto } from './dto/create-article-class.dto';
import { UpdateArticleClassDto } from './dto/update-article-class.dto';
import { Public } from '@/common/public/public.decorator'

@Controller('article-class')
export class ArticleClassController {
  constructor(private readonly articleClassService: ArticleClassService) {}

  @Post()
  create(@Body() createArticleClassDto: CreateArticleClassDto) {
    return this.articleClassService.create(createArticleClassDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.articleClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleClassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleClassDto: UpdateArticleClassDto) {
    return this.articleClassService.update(+id, updateArticleClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleClassService.remove(+id);
  }

  @Public()
  @Get('getList')
  getArticleClass() {
    return this.articleClassService.getList();
  }
}
