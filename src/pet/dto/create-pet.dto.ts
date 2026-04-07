export class CreatePetDto {
  name: string;
  species: string;
  breed: string;
  birthDate: Date;
  weight: number;
  sex: string;
  photoUrl?: string;
  userId: string;
}
