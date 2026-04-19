import { UsersArrayResponseDto } from '../dto/users-array-response.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export const toUserResponseArrayDto = (users: any[]) => {
  const newUsers: UserResponseDto[] = [];
  users.map((user) => newUsers.push(new UserResponseDto(user)));
  return new UsersArrayResponseDto(users);
}