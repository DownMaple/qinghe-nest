import { Column, Entity } from 'typeorm'
import { BaseEntity } from '@/common/entities/BaseEntity'

@Entity('qinghe_collect')
export class Collect extends BaseEntity{

  @Column()
  userId: number

  @Column()
  associated: number

}