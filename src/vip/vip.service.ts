import { Injectable } from '@nestjs/common'
import { CreateVipDto } from './dto/create-vip.dto'
import { DetailsVipDto } from './dto/details-vip.dto'
import { UpdateVipDto } from './dto/update-vip.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Vip } from '@/vip/entities/vip.entity'
import { Collect } from '@/auth/entities/collect.entity'
import { JwtPayload } from '@/common/public/jwt-auth.strategy'
import { UpdateCollectDto } from '@/auth/dto/update-collect.dto'

@Injectable()
export class VipService {

  constructor(
    @InjectRepository(Vip) private readonly vipRepository: Repository<Vip>,
    @InjectRepository(Collect) private readonly collectRepository: Repository<Collect>,
  ) {}

  async create(createVipDto: CreateVipDto) {
    const vip = await this.vipRepository.findOne({where: {title: createVipDto.title}})
    if (vip) {
      return '该会员已存在'
    }
    await this.vipRepository.save(createVipDto)
    return '添加成功'
  }

  async findAll() {
    return await this.vipRepository.find({
      where: {status : 0},
      order: {sort: 'DESC'}
    });
  }

  async findOne(id: number, user:JwtPayload): Promise<DetailsVipDto | null> {
    const vipList = await this.vipRepository.query(`
      SELECT v.*,
        (SELECT d.title FROM qinghe_dictionary d WHERE d.id = v.industryId) AS industryTitle,
        (SELECT d.title FROM qinghe_dictionary d WHERE d.id = v.positionId) AS positionTitle,
        (SELECT d.title FROM qinghe_dictionary d WHERE d.id = v.scaleId) AS scaleTitle,
        (SELECT d.title FROM qinghe_dictionary d WHERE d.id = v.specialId) AS specialTitle
        FROM qinghe_vip v where v.id = ${id}
    `)
    if (!user && vipList) {
      vipList[0].collect = false
    } else {
      const collect = await this.collectRepository.findOne({where: {associated: id, userId: user.id}})
      vipList[0].collect = !!collect
    }
    return vipList && vipList.length > 0 ? vipList[0] : null
  }

 async  update(id: number, updateVipDto: UpdateVipDto) {
    await this.vipRepository.update(id, updateVipDto)
    return `修改成功`;
  }

  async remove(id: number) {
    await this.vipRepository.update(id, {status: 1})
    return `删除成功`;
  }

  async filterVip(title: string, pageNum: number, pageSize: number, industryId: number, positionId: number, scaleId: number, specialId: number) {
    return await this.vipRepository.query(`
      select vip.*, d.title as industryTitle from qinghe_vip as vip left join qinghe_dictionary d on vip.industryId = d.id
      where vip.status = 0 
      ${ industryId == 0 ?'': 'and vip.industryId = ' + industryId}
      ${ positionId == 0 ?'': 'and vip.positionId = ' + positionId}
      ${ scaleId == 0 ?'': 'and vip.scaleId = ' + scaleId}
      ${ specialId == 0 ?'': 'and vip.specialId = ' + specialId}
      ${title && title !== '' ?'and vip.title like %' + title + '%': ''}
      order by vip.sort desc
      limit ${(pageNum - 1) > 0 ? (pageNum - 1) * pageSize : 0},${pageSize}
    `)
  }

  async collect(userId: number, vipId: number) {
    const isHas = await this.collectRepository.findOne({where: {userId, associated: vipId}})
    if (isHas) {
      const collectDto = new UpdateCollectDto()
      collectDto.userId = userId
      collectDto.associated = 0
      await this.collectRepository.update({id: isHas.id}, collectDto)
      return '取消收藏'
    } else {
      const hasMsg = await this.collectRepository.findOne({where: {userId, associated: 0}})
      if (hasMsg) {
        const updateCollectDto = new UpdateCollectDto()
        updateCollectDto.userId = userId
        updateCollectDto.associated = vipId
        await this.collectRepository.update({id: hasMsg.id}, updateCollectDto)
        return '收藏成功'
      } else {
        await this.collectRepository.save({userId, associated: vipId})
        return '收藏成功'
      }
    }
  }
}
