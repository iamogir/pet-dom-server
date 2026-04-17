import { PetResponseDto } from '../dto/pet-response.dto';
import { UserPetsResponseDto } from '../../user/dto/user-pets-response.dto';

export const toPetResponseArrayDto = (pets: any[]) => {
  const newPets: PetResponseDto[] = [];
  pets.map((pet) => newPets.push(new PetResponseDto(pet)));
  return new UserPetsResponseDto(newPets);
}