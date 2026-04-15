import { PetResponseDto } from '../../pet/dto/pet-response.dto';

export class UserPetsResponseDto {
  data: PetResponseDto[];
  meta: {
    total: number;
  };
  //TODO typing of data/pets !!!

  constructor(pets: PetResponseDto[]) {
    this.data = pets;
    this.meta = {
      total: pets.length,
    };
  }
}
