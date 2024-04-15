import { Column, Entity } from 'typeorm'
import { BaseEntity } from '@/common/entities/BaseEntity'

@Entity("qinghe_vip")
export class Vip extends BaseEntity {
  @Column({
    comment: '会员企业名称',
    length: 50,
    nullable: false
  })
  title: string

  @Column({
    comment: '企业logo',
    nullable: false
  })
  img: string

  @Column({
    comment: '行业id',
    nullable: false
  })
  industryId: number

  @Column({
    comment: '职位id',
    nullable: false
  })
  positionId: number

  @Column({
    comment: '企业规模id',
    nullable: false
  })
  scaleId: number

  @Column({
    comment: '企业专委会分类id',
    nullable: true
  })
  specialId: number

  @Column({
    comment: '企业地址',
    length: 50,
    nullable: false
  })
  address: string

  @Column({
    comment: '省',
    length:10
  })
  province: string

  @Column({
    comment: '省编号'
  })
  provinceCode: number


  @Column({
    comment: '市',
    length:10
  })
  city: string


  @Column({
    comment: '市编号'
  })
  cityCode: number


  @Column({
    comment: '区/县',
    length:30
  })
  area: string

  @Column({
    comment: '区编号'
  })
  areaCode: number

  @Column({
    comment: '企业简介',
    type: 'text',
    nullable: true
  })
  content: string

  @Column({
    comment: '企业描述',
    type: 'text',
    nullable: true
  })
  describe: string

  @Column({
    comment: '企业负责人',
    length: 20,
    nullable: false
  })
  principal:string

  @Column({
    comment: '企业负责人姓名',
    length: 20,
    nullable: false
  })
  principalName:string

  @Column({
    comment: '经度',
    length:20,
    default: ''
  })
  lng?: string

  @Column({
    comment: '维度',
    length:20,
    default: ''
  })
  lat?: string

  @Column({
    comment: '排序',
    default: 0
  })
  sort?: number
}
