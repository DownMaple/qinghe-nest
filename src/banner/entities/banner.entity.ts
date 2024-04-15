import { Column, Entity, } from 'typeorm'
import { BaseEntity } from '@/common/entities/BaseEntity'

@Entity( 'qinghe_banner')
export class Banner extends BaseEntity {

  /**
   * banner名称
   */
  @Column()
  title: string

  /**
   * banner图片
   */
  @Column()
  img: string

  /**
   * banner链接
   */
  @Column({nullable: true,default: ''})
  url?: string

  /**
   * banner排序
   */
  @Column({nullable: true,default: 0})
  sort?: number


}
