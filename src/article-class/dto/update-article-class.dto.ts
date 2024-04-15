import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleClassDto } from './create-article-class.dto';

export class UpdateArticleClassDto extends PartialType(CreateArticleClassDto) {}
