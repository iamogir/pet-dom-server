import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: Request & { user: { id: string } }) {
    return this.userService.getMe(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/pets')
  getMyPets(@Req() req: Request & { user: { id: string } }) {
    return this.userService.getMyPets(req.user.id);
  }

  @Get('/:id/pets')
  getAllPetsByUser(@Param('id') id: string) {
    return this.userService.getAllPetsByUser(id);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me')
  editUser(@Req() req: Request & { user: { id: string } }) {
    return this.userService.editUser(req.user.id);
  }
}
