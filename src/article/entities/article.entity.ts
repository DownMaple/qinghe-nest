import { Column, Entity } from 'typeorm'
import { BaseEntity } from '@/common/entities/BaseEntity'

@Entity( 'qinghe_article')
export class Article extends BaseEntity {

  /**
   * 文章标题
   */
  @Column()
  title: string

  /**
   * 封面图片
   */
  @Column()
  img: string

  /**
   * 文章内容
   */
  @Column({type:"text"})
  content: string

  /**
   * 文章分类id
   */
  @Column()
  articleClassId: number

  /**
   * 文章分类名称
   */
  @Column()
  articleClassName: string

  /**
   * 发布状态 0未发布 1已发布
   */
  @Column({nullable: true,default: 0})
  release?: number

  /**
   * 排序
   */
  @Column({nullable: true,default: 0})
  sort?: number

}
