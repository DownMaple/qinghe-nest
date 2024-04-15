import { Column, Entity } from 'typeorm'
import { BaseEntity } from '@/common/entities/BaseEntity'

@Entity('qinghe_enterprise')
export class Enterprise extends BaseEntity {
  /**
   * 名称
   */
  @Column()
  title: string

  /**
   * 图片
   */
  @Column({})
  img: string

  /**
   * 详细地址
   */
  @Column()
  address: string

  /**
   * 省
   */
  @Column({length:10})
  province: string

  /**
   * 省编号
   */
  @Column()
  provinceCode: number

  /**
   * 市
   */
  @Column({length:10})
  city: string

  /**
   * 市编号
   */
  @Column()
  cityCode: number

  /**
   * 区
   */
  @Column({length:30})
  area: string

  /**
   * 区编号
   */
  @Column()
  areaCode: number

  /**
   * 手机号
   */
  @Column({length:20})
  phone: string

  /**
   * 类别
   */
  @Column()
  classId: number

  /**
   * 类别名称
   */
  @Column({length:20})
  classTitle: string

  /**
   * 内容
   */
  @Column({type:'text', nullable: true})
  content?: string

  /**
   * 营业时间
   */
  @Column({default: ''})
  time?: string

  /**
   * 经度
   */
  @Column({length:20,default: ''})
  lng?: string

  /**
   * 维度
   */
  @Column({length:20,default: ''})
  lat?: string


  /**
   * 排序
   */
  @Column({nullable: true,default: 0})
  sort?: number

}
