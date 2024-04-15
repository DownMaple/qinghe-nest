import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from '@/article/entities/article.entity'
import { ArticleController } from '@/article/article.controller'
import { ArticleService } from '@/article/article.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([Article]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
