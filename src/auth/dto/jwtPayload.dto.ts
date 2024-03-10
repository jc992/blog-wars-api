export class JwtPayloadDto {
  constructor(
    public message: string,
    public password: string,
    public username: string,
  ) {}
}
