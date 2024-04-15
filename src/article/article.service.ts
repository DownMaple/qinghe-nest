import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Article } from '@/article/entities/article.entity'

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    await this.article.save(createArticleDto)
    return '添加成功';
  }

  async findAll() {
    return await this.article.find({
      where: {status: 0},
      order: {sort: 'DESC'}
    });
  }

  findOne(id: number) {
    return this.article.findOne({
      where: {status: 0, id}
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.article.update(id, updateArticleDto);
  }

  async remove(id: number) {
    const article: Article = await this.findOne(id);
    return await this.article.remove(article);
  }

  async getNotifyList() {
    return await this.article.find({
      where: {status: 0, release: 1, articleClassId: 3},
      order: {sort: 'DESC'},
      take: 5
    })
  }

  async releaseArticle(id: number, release:number) {
    await this.article.update(id, {release})
    return release == 0 ? '取消发布成功' : '发布成功'
  }

  async getArticleList(classId: number, pageNum: number, pageSize: number) {
    return await this.article.find({
      where: {status: 0, release: 1, articleClassId: classId},
      order: {sort: 'DESC'},
      skip: (pageNum - 1) > 0 ? (pageNum - 1) * pageSize : 0,
      take: pageSize
    })
  }
}
