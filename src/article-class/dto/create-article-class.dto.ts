export class CreateArticleClassDto {
  constructor(
    public title: string,
    public parentId: number,
    public sort?: number,
  ) {}
}
