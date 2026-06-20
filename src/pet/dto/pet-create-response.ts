export class PetCreateResponseDto {
  id: string;
  name: string;
  species: string;
  breed?: string;
  photoUrl?: string;

  constructor(pet: {
    id: string;
    name: string;
    species: string;
    breed: string | null;
    photoUrl: string | null;
  }) {
    this.id = pet.id;
    this.name = pet.name;
    this.species = pet.species;
    if (pet.breed !== null) this.breed = pet.breed;
    if (pet.photoUrl !== null) this.photoUrl = pet.photoUrl;
  }
}