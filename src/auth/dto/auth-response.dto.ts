export class AuthResponseDto {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
    phone: string;
    country: string;
    gender: string;
    birthDate: string;
  };
  constructor(
    access_token: string,
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    country: string,
    gender: string,
    birthDate: string,
    avatarUrl?: string | null,
  ) {
    this.access_token = access_token;
    this.user = {
      id,
      email,
      firstName,
      lastName,
      phone,
      country,
      gender,
      birthDate,
      avatarUrl: avatarUrl ? avatarUrl : undefined,
    };
  }
}
