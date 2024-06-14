import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { BitacoraService } from 'src/bitacora/bitacora.service';
import { Bitacora } from 'src/bitacora/entities/bitacora.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bitacoraService: BitacoraService,
    private readonly jwtService: JwtService,
  ) {}

  async register(/*{ name, usuario, password }*/registro: RegisterDto) {
    const user = await this.usersService.findOneByEmail(registro.usuario);
    //console.log('user',user);

    if (user) {
      throw new BadRequestException('User already exists');
    }


    await this.usersService.create(registro/*{
      name,
      email,
      password: await bcryptjs.hash(password, 10),
    }*/);

    return {usuario:registro.usuario,name:registro.name}/*{
      registro.name,
      email,
    }*/;
  }

  async login({ usuario, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(usuario);
    if (!user) {
      throw new UnauthorizedException('usuario is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { usuario: user.usuario, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    const roldata=user.role;
    const userdata=user.name/*+' '+user.last_name*/;
    console.log('user login', user);
    
    if(user.role!=='superuser'){
      let bitacora=new Bitacora;
      bitacora.fecha_evento=new Date().toLocaleString();
      bitacora.detalle='inicio de sesion del usuario '+user.usuario+' con codigo ID Nro '+user.id;
      bitacora.usuario_id=''+user.id;
      bitacora.tipo='sesiones';
      bitacora.contenido='se accedio a al sistema, siendo la verificacion con los siguientes datos: '+JSON.stringify(user).replaceAll(',',', ');
      const bitacoradata= await this.bitacoraService.create(bitacora);
    }

    return {
      token,
      tipo:roldata,
      user:userdata
    };
  }

  async profile({ usuario, role }: { usuario: string; role: string }) {
    return await this.usersService.findOneByEmail(usuario);
  }
}
