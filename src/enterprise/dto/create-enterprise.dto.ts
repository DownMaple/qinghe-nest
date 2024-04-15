export class CreateEnterpriseDto {
  constructor(
    public title: string,
    public img: string,
    public address: string,
    public province: string,
    public provinceCode: number,
    public city: string,
    public cityCode: number,
    public area: string,
    public areaCode: number,
    public classId: number,
    public classTitle: string,
    public phone: string,
    public sort?: number,
    public content?: string,
    public time?: string,
    public lng?: string,
    public lat?: string,
  ) {}
}
