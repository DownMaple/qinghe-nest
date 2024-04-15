export class CreateAuthDto {
  constructor(
    public readonly username: string,
    public password: string,
  ) {}
}
