export class CreateResponseDto {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  weight: number;
  sex: string;
  photoUrl?: string;

  constructor(
    id: string,
    name: string,
    species: string,
    breed: string,
    birthDate: string,
    weight: number,
    sex: string,
    photoUrl?: string,
  ) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.breed = breed;
    this.birthDate = birthDate;
    this.weight = weight;
    this.sex = sex;
    this.photoUrl = photoUrl ? photoUrl : undefined;
  }
}
