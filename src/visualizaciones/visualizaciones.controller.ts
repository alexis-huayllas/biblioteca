import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisualizacionesService } from './visualizaciones.service';
import { CreateVisualizacioneDto } from './dto/create-visualizacione.dto';
import { UpdateVisualizacioneDto } from './dto/update-visualizacione.dto';

@Controller('visualizaciones')
export class VisualizacionesController {
  constructor(private readonly visualizacionesService: VisualizacionesService) {}

  @Post()
  async create(@Body() createVisualizacioneDto: CreateVisualizacioneDto) {
    let data=await this.visualizacionesService.findAll();
    if(data.length>0){
      let dara=await this.visualizacionesService.update(+data[0].id, {numero_vistas:(Number(data[0].numero_vistas)+1)});
      data=await this.visualizacionesService.findAll();
      return data;
    }
    else{
      return this.visualizacionesService.create(createVisualizacioneDto);
    }
  }

  @Get()
  findAll() {
    return this.visualizacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visualizacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisualizacioneDto: UpdateVisualizacioneDto) {
    return this.visualizacionesService.update(+id, updateVisualizacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visualizacionesService.remove(+id);
  }
}
