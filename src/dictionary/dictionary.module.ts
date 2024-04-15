import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { Dictionary } from '@/dictionary/entities/dictionary.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Dictionary]),
  ],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
