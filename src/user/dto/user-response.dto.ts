export class UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  phone: string;
  country: string;
  gender: string;
  birthDate: string | Date;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.country = user.country;
    this.gender = user.gender;
    this.birthDate = String(user.birthDate);
    this.avatarUrl = user.avatarUrl ? user.avatarUrl : undefined;
  }
}
