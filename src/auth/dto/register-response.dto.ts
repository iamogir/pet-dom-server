export class ResponseRegisterDto {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  constructor(access_token: string, id: string, email: string, name: string) {
    this.access_token = access_token;
    this.user = {
      id,
      email,
      name,
    };
  }
}
