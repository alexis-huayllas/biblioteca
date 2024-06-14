import { Injectable } from '@nestjs/common';
import { CreateSancionDto } from './dto/create-sancion.dto';
import { UpdateSancionDto } from './dto/update-sancion.dto';
import { Sancion } from './entities/sancion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SancionService {

  constructor(
    @InjectRepository(Sancion)
    private readonly sancionRepository:Repository<Sancion>
  ){}
  
  async create(createSancionDto: CreateSancionDto) {
    return await this.sancionRepository.save(createSancionDto);
    //return 'This action adds a new sancion';
  }

  async findAll() {
    return await this.sancionRepository.find();
    //return `This action returns all sancion`;
  }

  async findOne(id: number) {
    return await this.sancionRepository.findOneBy({id});
    //return `This action returns a #${id} sancion`;
  }

  async update(id: number, updateSancionDto: UpdateSancionDto) {
    return await this.sancionRepository.update(id,updateSancionDto);
    //return `This action updates a #${id} sancion`;
  }

  async remove(id: number) {
    return await this.sancionRepository.softDelete(id);//elimina logicamente por id
    //return `This action removes a #${id} sancion`;
  }
}
