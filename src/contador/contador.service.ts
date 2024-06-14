import { Injectable } from '@nestjs/common';
import { CreateContadorDto } from './dto/create-contador.dto';
import { UpdateContadorDto } from './dto/update-contador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contador } from './entities/contador.entity';

@Injectable()
export class ContadorService {

  constructor(
    @InjectRepository(Contador)
    private readonly contadorRepository:Repository<Contador>
  ){}

  async create(createContadorDto: CreateContadorDto) {
    return await this.contadorRepository.save(createContadorDto);
    //return 'This action adds a new contador';
  }

  async findAll() {
    return await this.contadorRepository.find();
    //return `This action returns all contador`;
  }

  async findOne(id: number) {
    return await this.contadorRepository.findOneBy({id});
    //return `This action returns a #${id} contador`;
  }

  async findAlltoOne(user: number, libro: number) {
    let data = await this.contadorRepository.find({where:[{usuario_id:''+user},{libro_id:''+libro}]});
    return {data:data,contador:data.length>0?data[0].inicios_sesion:0};
    //return `This action returns a #${id} contador`;
  }

  async update(id: number, updateContadorDto: UpdateContadorDto) {
    return await this.contadorRepository.update(id,updateContadorDto);
    //return `This action updates a #${id} contador`;
  }

  async remove(id: number) {
    return await this.contadorRepository.softDelete(id);//elimina logicamente por id
    //return `This action removes a #${id} contador`;
  }
}
