import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ActiveUser } from 'src/auth/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/auth/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/common/enums/rol.enum';
import { UsersService } from 'src/users/users.service';
import { BibliotecasService } from '../bibliotecas/bibliotecas.service';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService,private readonly usersService: UsersService,private readonly bibliotecasService: BibliotecasService) {}

  @Post()
  @Auth(Role.EXTERNO)
  async create(@Body() createReservaDto: CreateReservaDto,@ActiveUser() user: UserActiveInterface) {
    //console.log('usuario',createReservaDto.usuario_id);
    //console.log('user',user);

    if(createReservaDto.usuario_id===''){
      const users = await this.usersService.findOneByEmail(user.usuario);
      //console.log('vacio')
      users?createReservaDto.usuario_id=JSON.stringify(users.id):'';
    }
    //!createReservaDto.usuario_id?createReservaDto.usuario_id=JSON.parse(JSON.stringify(user))['id']:'';
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  async findAll() {
    let data:any= await this.reservaService.findAll();
    if(data.length>0){
      for(let i=0;i<data.length;i++){
        let user=data[i].usuario_id=await this.usersService.findOne(data[i].usuario_id);
        let libro=data[i].libro_id=await this.bibliotecasService.findOne(data[i].libro_id);
        /*console.log('item',user);*/
      }
    }
    return data;
    //return this.reservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(+id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservaService.remove(+id);
  }
}
