import { PetResponseDto } from '../../pet/dto/pet-response.dto';

export class UserPetsResponseDto {
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
