import { PetResponseDto } from './pet-response.dto';

export class PetsArrayResponseDto {
  data: PetResponseDto[];
  meta: {
    total: number;
  };

  constructor(pets: PetResponseDto[]) {
    this.data = pets;
    this.meta = {
      total: pets.length,
    };
  }
}
