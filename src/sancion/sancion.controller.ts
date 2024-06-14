import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SancionService } from './sancion.service';
import { CreateSancionDto } from './dto/create-sancion.dto';
import { UpdateSancionDto } from './dto/update-sancion.dto';

@Controller('sancion')
export class SancionController {
  constructor(private readonly sancionService: SancionService) {}

  @Post()
  create(@Body() createSancionDto: CreateSancionDto) {
    return this.sancionService.create(createSancionDto);
  }

  @Get()
  findAll() {
    return this.sancionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sancionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSancionDto: UpdateSancionDto) {
    return this.sancionService.update(+id, updateSancionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sancionService.remove(+id);
  }
}
