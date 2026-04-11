export class CreatePetDto {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  weight: number;
  sex: string;
  photoUrl?: string;
}
