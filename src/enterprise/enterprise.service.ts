import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Enterprise } from '@/enterprise/entities/enterprise.entity'

@Injectable()
export class EnterpriseService {

  constructor(
    @InjectRepository(Enterprise) private readonly enterprise: Repository<Enterprise>,
  ) {}

  async create(createEnterpriseDto: CreateEnterpriseDto) {
    const data = await this.enterprise.findOne({where: {title: createEnterpriseDto.title}})
    if (data) {
      return '该企业已存在'
    }
    await this.enterprise.save(createEnterpriseDto)
    return '新增成功'
  }

  async findAll() {
    return await this.enterprise.find({
      where: {status: 0},
      order: {sort: 'DESC'}
    })
  }

  async fondByPage(classId:number, pageNum:number, pageSize:number, title: string) {
    return await this.enterprise.query(`
      select * from qinghe_enterprise 
      where status = 0 
      ${!classId || classId === 0 ?'': 'and classId = ' + classId}
      ${title && title !== '' ?'and title like %' + title + '%': ''}
      order by sort desc
      limit ${(pageNum - 1) > 0 ? (pageNum - 1) * pageSize : 0},${pageSize}
    `)
  }

  async findOne(id: number) {
    return await this.enterprise.findOne({ where: {id} });
  }

  update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
    return `This action updates a #${id} enterprise`;
  }

  remove(id: number) {
    return `This action removes a #${id} enterprise`;
  }
}
