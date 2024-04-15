export class CreateVipDto {
  constructor(
    public title: string,
    public img: string,
    public industryId: number,
    public positionId: number,
    public scaleId: number,
    public address: string,
    public province: string,
    public provinceCode: number,
    public city: string,
    public cityCode: number,
    public area: string,
    public principal: string,
    public principalName: string,
    public content?: string,
    public describe?: string,
    public lng?: string,
    public lat?: string,
    public specialId?: number,
    public sort?: number
  ) {}
}
