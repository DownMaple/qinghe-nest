import { Test, TestingModule } from '@nestjs/testing';
import { ArticleClassController } from './article-class.controller';
import { ArticleClassService } from './article-class.service';

describe('ArticleClassController', () => {
  let controller: ArticleClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleClassController],
      providers: [ArticleClassService],
    }).compile();

    controller = module.get<ArticleClassController>(ArticleClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
