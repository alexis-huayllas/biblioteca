import { Body, Controller, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { ActiveUser } from './common/decorators/active-user.decorator';
import { UserActiveInterface } from './common/interfaces/user-active.interface';
import { Role } from './common/enums/rol.enum';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface RequestWithUser extends Request {
  user: {
    usuario: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.EXTERNO)
  profile(@ActiveUser() user: UserActiveInterface) {
    console.log('UserActiveInterface profile',user)
    return this.authService.profile(user);
  }

  @Get('profile2')
  @Auth(Role.ADMIN)
  profile2(@ActiveUser() user: UserActiveInterface) {
    console.log('UserActiveInterface profile',user)
    return this.authService.profile(user);
  }

  @Get('profile3')
  @Auth(Role.USER)
  profile3(@ActiveUser() user: UserActiveInterface) {
    console.log('UserActiveInterface profile',user)
    return this.authService.profile(user);
  }

  @Get('profile4')
  @Auth(Role.SUPERUSER)
  profile4(@ActiveUser() user: UserActiveInterface) {
    console.log('UserActiveInterface profile',user)
    return this.authService.profile(user);
  }

}
