import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export abstract class BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  /**
   * 创建时间
   */
  @CreateDateColumn({type:'datetime'})
  createTime: string

  /**
   * 更新时间
   */
  @UpdateDateColumn({type:'datetime'})
  updateTime: string

  /**
   * 状态
   */
  @Column({ default: 0 })
  status: number

  // /**
  //  * 创建者
  //  */
  // @Column({ nullable: true })
  // createId: number
  //
  // /**
  //  * 更新者
  //  */
  // @Column({ nullable: true })
  // updateId: number

}