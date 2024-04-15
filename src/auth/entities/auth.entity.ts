import { AfterLoad, Column, Entity, Generated } from 'typeorm'
import { BaseEntity } from '@/common/entities/BaseEntity'

@Entity('qinghe_auth')
export class Auth extends BaseEntity {

  @Column()
  @Generated('uuid')
  uuid:string

  @Column()
  username:string

  @Column()
  password:string


}
