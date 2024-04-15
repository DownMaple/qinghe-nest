import { BaseEntity } from '@/common/entities/BaseEntity'
import { Column, Entity } from 'typeorm'

@Entity("qinghe_dictionary")
export class Dictionary extends BaseEntity {

  @Column({
    comment: '字典名称',
    length: 50,
    nullable: false
  })
  title: string

  @Column({
    comment: '字典值',
    length: 50,
    nullable: false
  })
  value: string

  @Column({
    comment: '字典父级',
    nullable: false,
    default: 0
  })
  parentId: number

  @Column({
    comment: '字典描述',
    nullable: true
  })
  description?: string

  @Column({
    comment: '字典排序',
    nullable: true,
    default: 0
  })
  sort?: number
}
