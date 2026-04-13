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

  constructor(
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
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.country = country;
    this.gender = gender;
    this.birthDate = String(birthDate);
    this.avatarUrl = avatarUrl ? avatarUrl : undefined;
  }
}
