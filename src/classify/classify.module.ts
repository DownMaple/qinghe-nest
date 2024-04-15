import { Module } from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ClassifyController } from './classify.controller';
import { Classify } from '@/classify/entities/classify.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Classify]),
  ],
  controllers: [ClassifyController],
  providers: [ClassifyService],
})
export class ClassifyModule {}
