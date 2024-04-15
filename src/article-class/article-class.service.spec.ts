import { Test, TestingModule } from '@nestjs/testing';
import { ArticleClassService } from './article-class.service';

describe('ArticleClassService', () => {
  let service: ArticleClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleClassService],
    }).compile();

    service = module.get<ArticleClassService>(ArticleClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
