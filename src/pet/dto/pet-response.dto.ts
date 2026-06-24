export class PetResponseDto {
  id: string;
  name: string;
  species: string;
  breed?: string;
  birthDate?: string;
  weight?: string;
  sex?: string;
  photoUrl?: string;

  constructor(pet: {
    id: string;
    name: string;
    species: string;
    breed: string | null;
    birthDate: Date | null;
    weight: number | null;
    sex: string | null;
    photoUrl: string | null;
  }) {
    this.id = pet.id;
    this.name = pet.name;
    this.species = pet.species;
    if (pet.breed) this.breed = pet.breed;
    if (pet.birthDate) this.birthDate = String(pet.birthDate);
    if (pet.weight) this.weight = String(pet.weight);
    if (pet.sex) this.sex = pet.sex;
    if (pet.photoUrl) this.photoUrl = pet.photoUrl;
  }
}
