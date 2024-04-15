export class CreateBannerDto {
  constructor(
    public title: string,
    public img: string,
    public url?: string,
    public sort?: number,
  ) {}
}
