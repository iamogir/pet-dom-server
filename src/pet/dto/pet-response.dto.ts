export class PetResponseDto {
  id: string;
  name: string;
  species: string;
  breed?: string | null;
  birthDate?: string | null;
  weight?: string | null;
  sex?: string | null;
  photoUrl?: string | null;

  constructor(pet: {
    id: string;
    name: string;
    species: string;
    breed?: string | null;
    birthDate?: Date | null;
    weight?: number | null;
    sex?: string | null;
    photoUrl?: string | null;
  }) {
    this.id = pet.id;
    this.name = pet.name;
    this.species = pet.species;
    this.breed = pet.breed ? pet.breed : null;
    this.birthDate = pet.birthDate ? String(pet.birthDate) : null;
    this.weight = pet.weight ? String(pet.weight) : null;
    this.sex = pet.sex ? pet.sex : undefined;
    this.photoUrl = pet.photoUrl ? pet.photoUrl : undefined;
  }
}
