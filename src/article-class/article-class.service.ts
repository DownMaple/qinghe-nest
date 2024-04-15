import { Injectable } from '@nestjs/common';
import { CreateArticleClassDto } from './dto/create-article-class.dto';
import { UpdateArticleClassDto } from './dto/update-article-class.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import { ArticleClass } from '@/article-class/entities/article-class.entity'

@Injectable()
export class ArticleClassService {

  constructor(
    @InjectRepository(ArticleClass) private readonly articleClass: Repository<ArticleClass>,
  ) {}


  async create(createArticleClassDto: CreateArticleClassDto) {
    let data = await this.articleClass.find({where: {title: createArticleClassDto.title}})
    if (data.length > 0) {
      return '该分类已存在'
    }
    await this.articleClass.save(createArticleClassDto)
    return '添加成功'
  }

  async findAll() {
    return await this.articleClass.find({
      where: {status : 0 , id: Not(3)}
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} articleClass`;
  }

  update(id: number, updateArticleClassDto: UpdateArticleClassDto) {
    return `This action updates a #${id} articleClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} articleClass`;
  }

  async getList() {
    return await this.articleClass.find({
      where: {status : 0},
      order: {updateTime: 'DESC'}
    })
  }
}
