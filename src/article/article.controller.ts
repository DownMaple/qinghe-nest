import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Public } from '@/common/public/public.decorator'
import { Article } from '@/article/entities/article.entity'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }

  /**
   * 获取通知列表
   */
  @Public()
  @Get('/notify/list')
  getNotifyList() {
    return this.articleService.getNotifyList()
  }

  /**
   * 发布、取消发布文章
   * @param id
   * @param release
   */
  @Post('/release')
  releaseArticle(@Body('id') id: number, @Body('release') release: number) {
    return this.articleService.releaseArticle(id,release)
  }

  /**
   * 获取文章列表
   * @param classId
   * @param pageNum
   * @param pageSize
   */
  @Public()
  @Get('/articleClass/list')
  getArticleDetail(@Query('classId') classId: number, @Query('pageNum') pageNum: number, @Query('pageSize') pageSize: number) {
    return this.articleService.getArticleList(classId, pageNum, pageSize)
  }
}
