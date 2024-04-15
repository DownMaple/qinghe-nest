import { Module } from '@nestjs/common';
import { ArticleClassService } from './article-class.service';
import { ArticleClassController } from './article-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleClass } from '@/article-class/entities/article-class.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([ArticleClass]),
  ],
  controllers: [ArticleClassController],
  providers: [ArticleClassService],
})
export class ArticleClassModule {}
