import { PetResponseDto } from '../dto/pet-response.dto';
import { PetsArrayResponseDto } from '../dto/pets-array-response.dto';

// export const toPetResponseDto = (pet: any) => {
// }

export const toPetResponseArrayDto = (pets: any[]) => {
  const newPets: PetResponseDto[] = [];
  pets.map((pet) => newPets.push(new PetResponseDto(pet)));
  return new PetsArrayResponseDto(newPets);
};
