import { Column, Entity } from 'typeorm'
import { BaseEntity } from '@/common/entities/BaseEntity'

@Entity( 'qinghe_article_class')
export class ArticleClass extends BaseEntity {
  /**
   * 文章分类名称
   */
  @Column()
  title: string

  /**
   * 文章分类 父级
   */
  @Column({nullable: true,default: 0})
  prentId: number


  /**
   * 排序
   */
  @Column({nullable: true,default: 0})
  sort?: number

}
