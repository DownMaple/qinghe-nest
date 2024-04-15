import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Banner } from '@/banner/entities/banner.entity'

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private readonly banner: Repository<Banner>,
  ) {}


  async create(createBannerDto: CreateBannerDto) {
    await this.banner.save(createBannerDto)
    return '添加成功'
  }

  async findAll() {
    return await this.banner.find({where: {status : 0}})
  }

  findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return this.banner.update(id, updateBannerDto);
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
