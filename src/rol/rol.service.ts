import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {
  
  constructor(
    @InjectRepository(Rol)
    private readonly RolRepository:Repository<Rol>
  ){}


  async create(createRolDto: CreateRolDto) {
    return await this.RolRepository.save(createRolDto);
    //return 'This action adds a new rol';
  }

  async findAll() {
    return await this.RolRepository.find();
    //return `This action returns all rol`;
  }

  async findOne(id: number) {
    return await this.RolRepository.findOneBy({id});
    //return `This action returns a #${id} rol`;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    return await this.RolRepository.update(id,updateRolDto);
    //return `This action updates a #${id} rol`;
  }

  async remove(id: number) {
    return await this.RolRepository.softDelete(id);//elimina logicamente por id
    //return `This action removes a #${id} rol`;
  }
}
