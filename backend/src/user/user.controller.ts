import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('me/profile')
  async getProfile(@Req() req) {
    return this.userService.findById(req.user.id);
  }
}
