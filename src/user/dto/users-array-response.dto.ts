import { UserResponseDto } from './user-response.dto';

export class UsersArrayResponseDto {
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
