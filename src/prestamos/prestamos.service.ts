import { Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Not, Repository } from 'typeorm';
import { Prestamo } from './entities/prestamo.entity';

@Injectable()
export class PrestamosService {

  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamoRepository:Repository<Prestamo>
  ){}

  async create(createPrestamoDto: CreatePrestamoDto) {
    return await this.prestamoRepository.save(createPrestamoDto);
  }

  async findAll() {
    return await this.prestamoRepository.find();
  }
  async findalltouser(id: string) {
    return await this.prestamoRepository.find({where:{id_usuario:id}});
  }

  async findPrestamos() {
    return await this.prestamoRepository.find({where: {fecha_devolucion:IsNull()}});
  }

  async findDevoluciones() {
    const data:any[]=[];
    const datos= await await this.prestamoRepository.find();
    for (let i = 0; i < datos.length; i++) {
      if(datos[i].fecha_devolucion!==null){
        data.push(datos[i]);
      }
    }
    //console.log('data',data);
    return data;
  }


  async findOne(id: number) {
    return  await this.prestamoRepository.findOneBy({id});
  }

  async update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    return await this.prestamoRepository.update(id,updatePrestamoDto);
  }

  async remove(id: number) {
    return await this.prestamoRepository.softDelete(id);//elimina logicamente por id
  }
}
