import { Injectable } from '@nestjs/common';
import { CreateVisualizacioneDto } from './dto/create-visualizacione.dto';
import { UpdateVisualizacioneDto } from './dto/update-visualizacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visualizacion } from './entities/visualizacion.entity';

@Injectable()
export class VisualizacionesService {

  constructor(
    @InjectRepository(Visualizacion)
    private readonly VisualizacionRepository:Repository<Visualizacion>
  ){}


  async create(createVisualizacioneDto: CreateVisualizacioneDto) {
    //return 'This action adds a new visualizacione';
    return await this.VisualizacionRepository.save(createVisualizacioneDto);
  }

  async findAll() {
    return await this.VisualizacionRepository.find();
    //return `This action returns all visualizaciones`;
  }

  async findOne(id: number) {
    return await this.VisualizacionRepository.findOneBy({id});
    //return `This action returns a #${id} visualizacione`;
  }

  async update(id: number, updateVisualizacioneDto: UpdateVisualizacioneDto) {
    return await this.VisualizacionRepository.update(id,updateVisualizacioneDto);
    //return `This action updates a #${id} visualizacione`;
  }

  async remove(id: number) {
    return await this.VisualizacionRepository.softDelete(id);//elimina logicamente por id
    //return `This action removes a #${id} visualizacione`;
  }
}
