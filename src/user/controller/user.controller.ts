import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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
}
