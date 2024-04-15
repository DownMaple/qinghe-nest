import { BaseEntity } from '@/common/entities/BaseEntity'
import { Column, Entity } from 'typeorm'

@Entity('qinghe_classify')
export class Classify extends BaseEntity {

  /**
   * 分类名称
   */
  @Column()
  title: string

  /**
   * 分类图标
   */
  @Column()
  icon: string

  /**
   * 排序
   */
  @Column({nullable: true,default: 0})
  sort?: number

}
