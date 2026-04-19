export class SchemaPetDto {
  name: string;
  species: string;
  breed: string;
  birthDate: Date;
  weight: number;
  sex: string;
  photoUrl?: string;

  constructor(pet: any) {
    this.name = pet.name;
    this.species = pet.species;
    this.breed = pet.breed;
    this.birthDate = new Date(pet.birthDate);
    this.weight = Number(pet.weight);
    this.sex = pet.sex;
    this.photoUrl = pet.photoUrl;
  }
}