export class CreateClassifyDto {
  constructor(
    public title: string,
    public icon: string,
    public sort?: number,
  ) {}
}
