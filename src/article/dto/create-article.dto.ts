export class CreateArticleDto {
  constructor(
    public title: string,
    public img: string,
    public content: string,
    public articleClassId: number,
    public articleClassName: string,
    public release?: number,
    public sort?: number,
  ) {}
}
