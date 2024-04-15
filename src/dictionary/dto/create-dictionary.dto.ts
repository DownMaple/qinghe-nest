export class CreateDictionaryDto {
  constructor(
    public readonly title: string,
    public readonly value: string,
    public readonly parentId: number,
    public readonly description?: string,
    public readonly sort?: number,
  ) {
  }
}
