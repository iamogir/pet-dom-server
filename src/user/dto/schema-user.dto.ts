export class SchemaUserDto {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  phone: string;
  country: string;
  gender: string;
  birthDate: Date;

  constructor(user: any) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.avatarUrl = user.avatarUrl;
    this.phone = user.phone;
    this.country = user.country;
    this.gender = user.gender;
    this.birthDate = new Date(user.birthDate);
  }
}