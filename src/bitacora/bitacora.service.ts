import { Injectable } from '@nestjs/common';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';
import { UpdateBitacoraDto } from './dto/update-bitacora.dto';
import { Bitacora } from './entities/bitacora.entity';
import { Like, Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BitacoraService {

  constructor(
    @InjectRepository(Bitacora)
    private readonly bitacoraRepository:Repository<Bitacora>
  ){}

  async create(createBitacoraDto: CreateBitacoraDto) {
    //return 'This action adds a new Bitacora';
    return await this.bitacoraRepository.save(createBitacoraDto);
  }

  async findAll() {
    return await this.bitacoraRepository.find({where:{contenido:Not(Like("%superuser%"))}});
    //return await this.bitacoraRepository.find();
    //return `This action returns all Bitacora`;
  }

  async findAllAdmin() {
    let dataap=[];
    const data= await this.bitacoraRepository.find();
    //const data= await this.bitacoraRepository.find({where:[{contenido:Not(Like("%admin%"))},{contenido:Not(Like("%superuser%"))}]});
    for (let i = 0; i < data.length; i++) {
      if (!data[i].contenido.includes('"admin"')&&!data[i].contenido.includes('"superuser"')) {
        dataap.push(data[i]);
      }
    }
    //console.log('dataapp',dataap.length)
    return dataap;
    //return `This action returns all Bitacora`;
  }

  async findAllUser(id:string) {
    return await this.bitacoraRepository.find({where:{usuario_id:id}});
    //return await this.bitacoraRepository.find();
    //return `This action returns all Bitacora`;
  }

  async findOne(id: number) {
    return await this.bitacoraRepository.findOneBy({id});
    //return `This action returns a #${id} Bitacora`;
  }

  async update(id: number, updateBitacoraDto: UpdateBitacoraDto) {
    return await this.bitacoraRepository.update(id,updateBitacoraDto);
    //return `This action updates a #${id} Bitacora`;
  }

  async remove(id: number) {
    return await this.bitacoraRepository.softDelete(id);//elimina logicamente por id
    //return `This action removes a #${id} Bitacora`;
  }
}
