export class DetailsVipDto {
  constructor(
    public title: string,
    public img: string,
    public industryId: number,
    public industryTitle: string,
    public positionId: number,
    public positionTitle: string,
    public scaleId: number,
    public scaleTitle: string,
    public address: string,
    public province: string,
    public provinceCode: number,
    public city: string,
    public cityCode: number,
    public area: string,
    public principal: string,
    public principalName: string,
    public collect: boolean,
    public content?: string,
    public describe?: string,
    public lng?: string,
    public lat?: string,
    public specialId?: number,
    public specialTitle?: string,
    public sort?: number
  ) {}
}
