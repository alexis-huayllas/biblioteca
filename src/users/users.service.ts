import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    const salt= await bcryptjs.genSalt(10);
    createUserDto.password=await bcryptjs.hash(createUserDto.password,salt);
    return await this.userRepository.save(createUserDto);
  }

  async findOneByEmail(usuario:string){
    return await this.userRepository.findOneBy({usuario});
  }

  async findByEmailWithPassword(usuario: string) {
    let data:any= await this.userRepository.findOne({
      where: { usuario },
      select: ['id', 'name', 'usuario', 'password', 'role','estado'],
    });
    //console.log('findByEmailWithPassword',data)
    return data!==null?data.estado==='disponible'?data:null:data;
  }

  async findAll() {
    return await this.userRepository.find({where:{estado:Not('de baja')}});
  }

  async findAllBaja() {
    return await this.userRepository.find({where:{estado:'de baja'}});
  }

  async findUser(user:string) {
    return await this.userRepository.find({where:{usuario:user}});
  }

  async findOne(id: number) {
    return  await this.userRepository.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    
    return await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);//elimina logicamente por id
    //return await this.userRepository.softRemove(id);//elimina logicamente por instancia
  }
}
