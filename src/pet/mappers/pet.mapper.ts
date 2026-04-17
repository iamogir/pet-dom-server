import { PetResponseDto } from '../dto/pet-response.dto';

export const toPetResponseArray = (pets: any[]) => {
  const newPets: PetResponseDto[] = [];
  pets.map((pet) => newPets.push(new PetResponseDto(pet)));
  return newPets;
}