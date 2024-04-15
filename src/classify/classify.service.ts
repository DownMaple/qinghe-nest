import { Injectable } from '@nestjs/common'
import { CreateClassifyDto } from './dto/create-classify.dto'
import { UpdateClassifyDto } from './dto/update-classify.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Classify } from '@/classify/entities/classify.entity'

@Injectable()
export class ClassifyService {

  constructor(
    @InjectRepository(Classify) private readonly classify: Repository<Classify>,
  ) {}


  async create(createClassifyDto: CreateClassifyDto) {
    const data = await this.classify.find({where: {title: createClassifyDto.title}})
    if (data.length > 0) {
      return '该分类已存在'
    }
    await this.classify.save(createClassifyDto)
    return '添加成功'
  }

  async findAll() {
    return await this.classify.find({
      where: {status : 0},
      order: {sort: 'DESC'},
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} classify`;
  }

  update(id: number, updateClassifyDto: UpdateClassifyDto) {
    return `This action updates a #${id} classify`;
  }

  remove(id: number) {
    return `This action removes a #${id} classify`;
  }

  async getIndexList() {
    return await this.classify.find({
      where: { status: 0 },
      order: { sort: 'DESC' },
      take: 10
    })
  }
}
