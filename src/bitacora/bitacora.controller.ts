import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';
import { UpdateBitacoraDto } from './dto/update-bitacora.dto';
import { Role } from 'src/auth/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/auth/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/auth/common/interfaces/user-active.interface';

@Controller('Bitacora')
export class BitacoraController {
  constructor(private readonly BitacoraService: BitacoraService) {}

  @Post()
  create(@Body() createBitacoraDto: CreateBitacoraDto) {
    return this.BitacoraService.create(createBitacoraDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  findAll(@ActiveUser() user: UserActiveInterface) {
    if (user.role!=='superuser') {
      return this.BitacoraService.findAllAdmin();
    } else {
      return this.BitacoraService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.BitacoraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBitacoraDto: UpdateBitacoraDto) {
    return this.BitacoraService.update(+id, updateBitacoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.BitacoraService.remove(+id);
  }
}
