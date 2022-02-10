import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async verifyEmail(@Body('email') email) {
    try {
      await this.userService.getByEmail(email);

      return { exist: true };
    } catch (err) {
      return { exist: false };
    }
  }

  @Post('register')
  async register(@Body() body) {
    return await this.userService.create(body);
  }
}
