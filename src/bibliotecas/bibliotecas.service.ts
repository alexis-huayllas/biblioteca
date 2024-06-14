import { Injectable } from '@nestjs/common';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Biblioteca } from './entities/biblioteca.entity';
import { IsNull, Like, Not, Repository } from 'typeorm';
import * as fs from "fs";

@Injectable()
export class BibliotecasService {

  constructor(
    @InjectRepository(Biblioteca)
    private readonly bibliotecaRepository:Repository<Biblioteca>
  ){}

  async create(createBibliotecaDto: CreateBibliotecaDto) {
    return await this.bibliotecaRepository.save(createBibliotecaDto);
  }

  async findAll() {
    let data = await this.bibliotecaRepository.find({order:{'titulo':"ASC"}});
    data=data.filter((dato)=>dato.estado!=='de baja'?true:false);
    for (let i = 0; i < data.length; i++) {
      data[i].portada===''||data[i].portada===null?
      data[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
      data[i].portada='data:image/'+(data[i].portada.includes('.png')?'png':data[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+data[i].portada,'base64');
      //console.log(data[i].portada);
    }
    return data;
  }

  async findAllBaja() {
    let data = await this.bibliotecaRepository.find();
    data=data.filter((dato)=>dato.estado==='de baja'?true:false);
    for (let i = 0; i < data.length; i++) {
      data[i].portada===''||data[i].portada===null?
      data[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
      data[i].portada='data:image/'+(data[i].portada.includes('.png')?'png':data[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+data[i].portada,'base64');
      //console.log(data[i].portada);
    }
    return data;
  }

  async findDigital() {
    let digital= await this.bibliotecaRepository.find({where: {/*archivo: Not("null")*/tipo: Not("fisico")}});
    digital=digital.filter((dato)=>dato.estado!=='de baja'?true:false);
    for (let i = 0; i < digital.length; i++) {
      digital[i].portada===''||digital[i].portada===null?
      digital[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
      digital[i].portada='data:image/'+(digital[i].portada.includes('.png')?'png':digital[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+digital[i].portada,'base64');
      //console.log(digital[i].portada);
    }
    return digital;
  }

  async findFisico() {
    let fisico = await this.bibliotecaRepository.find({where: {/*archivo: IsNull()*/tipo: Not("digital")}});
    fisico=fisico.filter((dato)=>dato.estado!=='de baja'?true:false);
    for (let i = 0; i < fisico.length; i++) {
      fisico[i].portada===''||fisico[i].portada===null?
      fisico[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
      fisico[i].portada='data:image/'+(fisico[i].portada.includes('.png')?'png':fisico[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+fisico[i].portada,'base64');
      //console.log(fisico[i].portada);
    }
    return fisico;
  }

  async findOrderAllDigital(valuedata:string) {
    switch (valuedata) {
      case "autor":
        let data:any = await this.bibliotecaRepository.find({where: {tipo: Not("fisico")},order:{autor:"ASC"}});
        for (let i = 0; i < data.length; i++) {
          data[i].portada===''||data[i].portada===null?
          data[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
          data[i].portada='data:image/'+(data[i].portada.includes('.png')?'png':data[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+data[i].portada,'base64');
          //console.log(data[i].portada);
        }
        return data;
      case "palabras_clave":
        let data1:any = await this.bibliotecaRepository.find({where: {tipo: Not("fisico")},order:{palabras_clave:"ASC"}});
        for (let i = 0; i < data1.length; i++) {
          data1[i].portada===''||data1[i].portada===null?
          data1[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
          data1[i].portada='data:image/'+(data1[i].portada.includes('.png')?'png':data1[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+data1[i].portada,'base64');
          //console.log(data1[i].portada);
        }
        return data1;
      default:
        let data2:any = await this.bibliotecaRepository.find({where: {tipo: Not("fisico")},order:{titulo:"ASC"}});
        for (let i = 0; i < data2.length; i++) {
          data2[i].portada===''||data2[i].portada===null?
          data2[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
          data2[i].portada='data:image/'+(data2[i].portada.includes('.png')?'png':data2[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+data2[i].portada,'base64');
          //console.log(data2[i].portada);
        }
        return data2;
    }
  }

  async buscar(data:any,orderdata:string){
    let datos:any= await this.bibliotecaRepository.createQueryBuilder().select(['id','titulo','autor','reseña','palabras_clave','tipo','portada','cantidad','estado',]).where("titulo like '%"+data+"%'").orWhere("autor like '%"+data+"%'").orWhere("palabras_clave like '%"+data+"%'").orderBy(orderdata,'ASC').execute();
    //let titulo= await this.bibliotecaRepository.find({where: {titulo: Like("%"+data+"%")},order:{titulo:"ASC"}});
    //let autor= await this.bibliotecaRepository.find({where: {autor: Like("%"+data+"%")},order:{autor:"ASC"}});
    //let palabras_clave= await this.bibliotecaRepository.find({where: {palabras_clave: Like("%"+data+"%")},order:{palabras_clave:"ASC"}});
    //console.log('titulo',titulo.length);
    //console.log('autor',autor.length);
    //console.log('palabras_clave',palabras_clave.length);
    //console.log('datos',JSON.parse(JSON.stringify(datos)));
    for (let i = 0; i < datos.length; i++) {
      datos[i].portada===''||datos[i].portada===null?
      datos[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
      datos[i].portada='data:image/'+(datos[i].portada.includes('.png')?'png':datos[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+datos[i].portada,'base64');
      //console.log(datos[i].portada);
    }
    return JSON.parse(JSON.stringify(datos));
  }

  async takeAllDigital() {
    const first= await this.bibliotecaRepository.find({take:10,where: {titulo: Not("")},order:{CreatedAt:'ASC'}});
    //const first= await this.bibliotecaRepository.find({take:10,where: {archivo: Not("null")},order:{CreatedAt:'ASC'}});
    const last= await this.bibliotecaRepository.find({take:10,where: {titulo: Not("")},order:{CreatedAt:'DESC'}});
    //const last= await this.bibliotecaRepository.find({take:10,where: {archivo: Not("null")},order:{CreatedAt:'DESC'}});
    for (let i = 0; i < first.length; i++) {
      first[i].portada===''||first[i].portada===null?
      first[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
      first[i].portada='data:image/'+(first[i].portada.includes('.png')?'png':first[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+first[i].portada,'base64');
      //console.log(first[i].portada);
      //let file= fs.readFileSync('./public/noimage.png','base64');
      //let file= fs.readFileSync('./public/noimage.png'+datos?.archivo,'base64');
      
    }
    for (let i = 0; i < last.length; i++) {
      last[i].portada===''||last[i].portada===null?
      last[i].portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):
      last[i].portada='data:image/'+(last[i].portada.includes('.png')?'png':last[i].portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+last[i].portada,'base64');
    }
    return {first:first,last:last};
  }

  async findOne(id: number) {
    return await this.bibliotecaRepository.findOneBy({id});
  }

  async findOnePage(id: number) {
    let data= await this.bibliotecaRepository.findOneBy({id});
    return data;
  }

  async update(id: number, updateBibliotecaDto: UpdateBibliotecaDto) {
    return await this.bibliotecaRepository.update(id,updateBibliotecaDto);
  }

  async remove(id: number) {
    return await this.bibliotecaRepository.softDelete(id);//elimina logicamente por id
  }
}
