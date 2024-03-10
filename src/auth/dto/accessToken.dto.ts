export class AccessTokenDto {
  constructor(
    public accessToken: string,
    public message = '',
    public error = '',
  ) {}
}
