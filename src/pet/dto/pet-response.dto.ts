export class PetResponseDto {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  weight: number;
  sex: string;
  photoUrl?: string | null;

  constructor(pet: {
    id: string;
    name: string;
    species: string;
    breed: string;
    birthDate: Date;
    weight: number;
    sex: string;
    photoUrl: string | null;
  }) {
    this.id = pet.id;
    this.name = pet.name;
    this.species = pet.species;
    this.breed = pet.breed;
    this.birthDate = String(pet.birthDate);
    this.weight = pet.weight;
    this.sex = pet.sex;
    this.photoUrl = pet.photoUrl ? pet.photoUrl : undefined;
  }
}
