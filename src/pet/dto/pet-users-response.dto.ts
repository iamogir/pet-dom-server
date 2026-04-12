import { UserResponseDto } from '../../user/dto/user-response.dto';

export class PetUsersResponseDto {
  data: UserResponseDto[];
  meta: {
    total: number;
  };

  constructor(users: UserResponseDto[]) {
    this.data = users;
    this.meta = {
      total: users.length,
    };
  }
}
