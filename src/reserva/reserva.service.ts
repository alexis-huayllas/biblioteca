import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservaService {

  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository:Repository<Reserva>
  ){}



  async create(createReservaDto: CreateReservaDto) {
    return await this.reservaRepository.save(createReservaDto);
    
  }

  async findAll() {
    return await this.reservaRepository.find({where:{estado:"vigente"}});
    //return await this.reservaRepository.find();
  }

  async findAllreserva() {
    return await this.reservaRepository.find();
    //return await this.reservaRepository.find();
  }

  async findOne(id: number) {
    return await this.reservaRepository.findOneBy({id});
    //return `This action returns a #${id} reserva`;
  }

  async update(id: number, updateReservaDto: UpdateReservaDto) {
    return await this.reservaRepository.update(id,updateReservaDto);
    //return `This action updates a #${id} reserva`;
  }

  async remove(id: number) {
    return await this.reservaRepository.softDelete(id);//elimina logicamente por id
    //return `This action removes a #${id} reserva`;
  }
}
