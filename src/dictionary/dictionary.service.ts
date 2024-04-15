import { Injectable } from '@nestjs/common'
import { CreateDictionaryDto } from './dto/create-dictionary.dto'
import { UpdateDictionaryDto } from './dto/update-dictionary.dto'
import { Dictionary } from '@/dictionary/entities/dictionary.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class DictionaryService {

  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepository: Repository<Dictionary>,
  ) {
  }

  async create(createDictionaryDto: CreateDictionaryDto) {
    const data = await this.dictionaryRepository.findOne({
      where: { title: createDictionaryDto.title },
    })
    if (data) {
      return '该字典已存在'
    }
    if (createDictionaryDto.parentId !== 0) {
      const parent = await this.dictionaryRepository.findOne({
        where: { id: createDictionaryDto.parentId },
      })
      if (!parent) {
        return '父级字典不存在'
      }
      if (parent.parentId !== 0) {
        return '请选择没有父级的 字典项 作为父级字典'
      }
    }
    await this.dictionaryRepository.save(createDictionaryDto)
    return '新建字典成功'
  }

  async findAll() {
    return await this.dictionaryRepository.find({
      where: { status: 0 },
      order: { sort: 'DESC' },
    })
  }

  // 查询所有父级字典
  async findAllParent() {
    return await this.dictionaryRepository.find({
      where: { status: 0, parentId: 0 },
      order: { sort: 'DESC' },
    })
  }

  // 查询父级字典下的所有子级字典
  async findAllChild(id: number) {
    return await this.dictionaryRepository.find({
      where: { status: 0, parentId: id },
      order: { sort: 'DESC' },
    })
  }

  async findOne(id: number) {
    return await this.dictionaryRepository.findOne({
      where: { id: id },
    })
  }

  async update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
    const data = await this.dictionaryRepository.update(id, updateDictionaryDto)
    if (data.affected === 0) {
      return '该字典不存在'
    }
    return data.affected === 0 ? '修改字典失败' : '修改成功'
  }

  async remove(id: number) {
    const data = await this.dictionaryRepository.update(id, { status: 1 })
    return  data.affected === 0 ? '删除字典失败' : '删除成功'
  }
}
