import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';
import { BitacoraService } from 'src/bitacora/bitacora.service';
import { PrestamosService } from 'src/prestamos/prestamos.service';
import { BibliotecasService } from 'src/bibliotecas/bibliotecas.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly bitacoraService: BitacoraService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('portada/data')
  async findDataportada() {
    let users=await this.usersService.findAll();
    //let prestamos=await this.prestamosService.findPrestamos();
    //let libros=await this.bibliotecasService.findDigital();
    return {users:users.length-1};
  }

  @Get('data/baja')
  async findallbaja() {
    let users=await this.usersService.findAllBaja();
    //let prestamos=await this.prestamosService.findPrestamos();
    //let libros=await this.bibliotecasService.findDigital();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let user: any= await this.usersService.findOne(+id);
    let bitacora= await this.bitacoraService.findAllUser(''+user.id);
    return {usuario:user,bitacoras:bitacora};
    //return this.usersService.findOne(+id);
    //return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const salt= await bcryptjs.genSalt(10);
    //console.log(updateUserDto.password);
    console.log(updateUserDto);
    updateUserDto.password!==''&&updateUserDto.password!==undefined?updateUserDto.password=await bcryptjs.hash(JSON.parse(JSON.stringify(updateUserDto)).password,salt):'';
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('passw/data')
  async updatepass(@Body() updateUserDto: UpdateUserDto) {
    let us:string=JSON.parse(JSON.stringify(updateUserDto)).usuario;
    
    let user=await this.usersService.findUser(''+us);
    
    if (user.length>0) {
      const salt= await bcryptjs.genSalt(10);
      
      updateUserDto.password!==''?updateUserDto.password=await bcryptjs.hash(JSON.parse(JSON.stringify(updateUserDto)).password,salt):'';
      return this.usersService.update(+(user[0].id), updateUserDto);
    }else{
      throw new BadRequestException('Usuario no registrado');
      
    }
    
  }

  @Patch('pass/:id')
  async updatepassword(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const salt= await bcryptjs.genSalt(10);
    console.log('user','userdata');
    console.log(updateUserDto);
    updateUserDto.password!==''?updateUserDto.password=await bcryptjs.hash(JSON.parse(JSON.stringify(updateUserDto)).password,salt):'';
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
