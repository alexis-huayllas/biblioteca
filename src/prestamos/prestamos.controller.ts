import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { ReservaService } from 'src/reserva/reserva.service';
import { UsersService } from 'src/users/users.service';
import { BibliotecasService } from 'src/bibliotecas/bibliotecas.service';
import { SancionService } from 'src/sancion/sancion.service';
import { ActiveUser } from 'src/auth/common/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/common/enums/rol.enum';
import { UserActiveInterface } from 'src/auth/common/interfaces/user-active.interface';
import * as fs from "fs";

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService,
    private readonly usersService: UsersService,
    private readonly bibliotecasService: BibliotecasService,
    private readonly reservaService: ReservaService,
    private readonly sancionService: SancionService) {}

  @Post()
  async create(@Body() createPrestamoDto: CreatePrestamoDto) {
    const reserva= await this.reservaService.findOne(Number(createPrestamoDto.id_reserva));
    if(reserva){
      createPrestamoDto.id_documento=reserva.libro_id;
      createPrestamoDto.id_usuario=reserva.usuario_id;
    }
    return this.prestamosService.create(createPrestamoDto);
  }

  @Get()
  async findAll() {
    let data:any= await this.prestamosService.findAll();
    for (let i = 0; i < data.length; i++) {
      let ap=data[i].fecha_prestamo.split(',');
      ap[0]=ap[0].split('/').reverse().join('-');
      data[i].fecha_prestamo=ap.join(' ');
      data[i].id_documento=await this.bibliotecasService.findOne(Number(data[i].id_documento));
      data[i].id_reserva=await this.reservaService.findOne(Number(data[i].id_reserva));
      //data[i].id_sancion=await this.sancionService.findOne(Number(data[i].id_sancion));
      data[i].id_usuario=await this.usersService.findOne(Number(data[i].id_usuario));
    }
    return data;
  }

  @Get('prestamos')
  async findPrestamos() {
    //let data:any= await this.prestamosService.findPrestamos();
    let data:any= await this.prestamosService.findAll();
    data=data.filter((dato:any)=>dato.fecha_devolucion===null?true:false);
    for (let i = 0; i < data.length; i++) {
      let ap=data[i].fecha_prestamo.split(',');
      ap[0]=ap[0].split('/').reverse().join('-');
      data[i].fecha_prestamo=ap.join(' ');
      data[i].id_documento=await this.bibliotecasService.findOne(Number(data[i].id_documento));
      data[i].id_reserva=await this.reservaService.findOne(Number(data[i].id_reserva));
      data[i].id_sancion=await this.sancionService.findOne(Number(data[i].id_sancion));
      data[i].id_usuario=await this.usersService.findOne(Number(data[i].id_usuario));
      //console.log(new Date(data[i].fecha_prestamo));
    }
    return data;
  }

  @Get('devoluciones')
  async findDevoluciones() {
    //let data:any=await this.prestamosService.findDevoluciones();
    let data:any= await this.prestamosService.findAll();
    data=data.filter((dato:any)=>dato.fecha_devolucion!==null?true:false);
    for (let i = 0; i < data.length; i++) {
      let ap=data[i].fecha_prestamo.split(',');
      ap[0]=ap[0].split('/').reverse().join('-');
      data[i].fecha_prestamo=ap.join(' ');
      data[i].id_documento=await this.bibliotecasService.findOne(Number(data[i].id_documento));
      data[i].id_reserva=await this.reservaService.findOne(Number(data[i].id_reserva));
      let sanciones:any=data[i].id_sancion!==null&&data[i].id_sancion!==''?JSON.parse(data[i].id_sancion):[];
      for (let j = 0; j < sanciones.length; j++) {
        sanciones[j] = await this.sancionService.findOne(Number(sanciones[j])); 
      }
      data[i].id_sancion=sanciones;
      data[i].id_usuario=await this.usersService.findOne(Number(data[i].id_usuario));
      //console.log(data[i]);
    }
    return data;
  }

  @Get('portada/data')
  async portada() {
    let users= await this.usersService.findAll();
    let prestamos= await this.prestamosService.findDevoluciones();
    let libros= await this.bibliotecasService.findDigital();
    return {prestamos:prestamos.length,users:users.length-1,libros:libros.length};
  }

  @Get('portada/dataindex')
  async portadaindex() {
    let data=await this.prestamosService.findAll();
    let libros= await this.bibliotecasService.takeAllDigital();
    libros.first=libros.first.filter((fil)=>fil.estado!=='de baja'?true:false);
    libros.last=libros.last.filter((fil)=>fil.estado!=='de baja'?true:false);
    if (libros.first.length>0){
      for (let i = 0; i < libros.first.length; i++) {
        if(libros.first[i].tipo!=='digital'){
          let filtro=data.filter((fil)=>Number(fil.id_documento)===libros.first[i].id&&fil.fecha_devolucion===null?true:false);
          console.log(filtro.length+' '+(Number(libros.first[i].cantidad))+' '+libros.first[i].id+' '+libros.first[i].estado);
          if(libros.first[i].estado==='disponible'){
            if(filtro.length<(Number(libros.first[i].cantidad))){
              libros.first[i].estado='disponible'
            }
            else{
              libros.first[i].estado='no disponible'
            }
          }
        }
        
        
      }
    }
    if (libros.last.length>0){
      for (let i = 0; i < libros.last.length; i++) {
        if(libros.last[i].tipo!=='digital'){
          let filtro=data.filter((fil)=>Number(fil.id_documento)===libros.last[i].id&&fil.fecha_devolucion===null?true:false);
          if(libros.last[i].estado==='disponible'){
            if(filtro.length<(Number(libros.last[i].cantidad))){
              libros.last[i].estado='disponible'
            }
            else{
              libros.last[i].estado='no disponible'
            }
          }
        }
        
        
      }
    }
    //let users= await this.usersService.findAll();
    //let prestamos= await this.prestamosService.findDevoluciones();

    return libros;
  }

  @Get('user')
  @Auth(Role.USER)
  async findOneUser(@Param('id') id: string,@ActiveUser() user: UserActiveInterface) {
    let userdata = await this.usersService.findOneByEmail(user.usuario);
    let data:any = await this.prestamosService.findAll();
    let prestamos=[];
    let devoluciones=[];
    let reservas:any=await this.reservaService.findAllreserva();
    for (let i = 0; i < reservas.length; i++) {
      reservas[i].libro_id=await this.bibliotecasService.findOne(Number(reservas[i].libro_id));
      reservas[i].libro_id.portada===''||reservas[i].libro_id.portada===null?reservas[i].libro_id.portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):reservas[i].libro_id.portada='data:image/'+(reservas[i].libro_id.portada.includes('.png')?'png':reservas[i].libro_id.portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+reservas[i].libro_id.portada,'base64');
    }
    reservas=reservas.filter((dato:any)=>(Number(dato.usuario_id))===userdata?.id&&dato.estado==='vigente'?true:false);
    data=data.filter((dato:any)=>(+dato.id_usuario)===userdata?.id?true:false);
    for (let i = 0; i < data.length; i++) {
      let ap=data[i].fecha_prestamo.split(',');
      ap[0]=ap[0].split('/').reverse().join('-');
      data[i].fecha_prestamo=ap.join(' ');
      data[i].id_documento=await this.bibliotecasService.findOne(Number(data[i].id_documento));
      data[i].id_documento.portada===''||data[i].id_documento.portada===null?data[i].id_documento.portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):data[i].id_documento.portada='data:image/'+(data[i].id_documento.portada.includes('.png')?'png':data[i].id_documento.portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+data[i].id_documento.portada,'base64');
      data[i].id_reserva=await this.reservaService.findOne(Number(data[i].id_reserva));
      let sanciones:any=data[i].id_sancion!==null&&data[i].id_sancion!==''?JSON.parse(data[i].id_sancion):[];
      for (let j = 0; j < sanciones.length; j++) {
        sanciones[j] = await this.sancionService.findOne(Number(sanciones[j])); 
      }
      data[i].id_sancion=sanciones;
      /*if (data[i].id_reserva) {
        reservas.push(data[i].id_reserva);
      }*/
      if (data[i].fecha_devolucion!==null) {
        devoluciones.push(data[i]);
      } else {
        prestamos.push(data[i]);
      }
    }
    //console.log(user)
    //console.log(userdata)
    return {user:userdata,reservas:reservas,prestamos:prestamos,devoluciones:devoluciones};
    //return this.prestamosService.findOne(+id);
  }

  @Get('perfil')
  @Auth(Role.USER)
  async findPerfil(@Param('id') id: string,@ActiveUser() user: UserActiveInterface) {
    let alert:any=[];
    let data:any = await this.prestamosService.findAll();
    let reservas:any=await this.reservaService.findAllreserva();
    if (user.role==='user'||user.role==='externo'){
      let userdata = await this.usersService.findOneByEmail(user.usuario);
      reservas=reservas.filter((dato:any)=>(Number(dato.usuario_id))===userdata?.id&&dato.estado==='vigente'?true:false);
      data=data.filter((dato:any)=>(+dato.id_usuario)===userdata?.id?true:false);
      for (let i = 0; i < reservas.length; i++) {
        reservas[i].libro_id=await this.bibliotecasService.findOne(Number(reservas[i].libro_id));
        let fecha:any=new Date(reservas.fecha_reserva);
        fecha.setDate(fecha.getDate()+10);
        let ahora:any=new Date();
        if(parseInt(`${((ahora)-fecha)/(1000*60*60*24)}`,10)>0){
          reservas[i].estado='pasado';
          let reser=await this.reservaService.update(reservas[i].id,reservas[i]);
          alert.push({titulo:'reserva archivada',value:'se archivo la reserva de fecha '+reservas[i].fecha_reserva+' del libro de titulo:'+reservas[i].libro_id.titulo});
        }
        //reservas[i].libro_id=await this.bibliotecasService.findOne(Number(reservas[i].libro_id));
        reservas[i].libro_id.portada===''||reservas[i].libro_id.portada===null?reservas[i].libro_id.portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):reservas[i].libro_id.portada='data:image/'+(reservas[i].libro_id.portada.includes('.png')?'png':reservas[i].libro_id.portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+reservas[i].libro_id.portada,'base64');
      }
      let prestamos=[];
      let devoluciones=[];
      
      for (let i = 0; i < data.length; i++) {
        let ap=data[i].fecha_prestamo.split(',');
        ap[0]=ap[0].split('/').reverse().join('-');
        data[i].fecha_prestamo=ap.join(' ');
        data[i].id_documento=await this.bibliotecasService.findOne(Number(data[i].id_documento));
        data[i].id_documento.portada===''||data[i].id_documento.portada===null?data[i].id_documento.portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):data[i].id_documento.portada='data:image/'+(data[i].id_documento.portada.includes('.png')?'png':data[i].id_documento.portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+data[i].id_documento.portada,'base64');
        data[i].id_reserva=await this.reservaService.findOne(Number(data[i].id_reserva));
        let sanciones:any=data[i].id_sancion!==null&&data[i].id_sancion!==''?JSON.parse(data[i].id_sancion):[];
        for (let j = 0; j < sanciones.length; j++) {
          sanciones[j] = await this.sancionService.findOne(Number(sanciones[j])); 
        }
        data[i].id_sancion=sanciones;
        let fecha:any=new Date(data[i].fecha_prestamo);
        fecha.setDate(fecha.getDate()+Number(data[i].tiempo_limite));
        let ahora:any=new Date();
        if(data[i].fecha_devolucion!==null&&parseInt(`${((ahora)-fecha)/(1000*60*60*24)}`,10)>0){
          alert.push({titulo:'devolucion con retraso',value:'tiene una devolucion con retraso del libro '+data[i].id_documento.titulo+''});
        }
        if(data[i].fecha_devolucion!==null&&parseInt(`${((ahora)-fecha)/(1000*60*60*24)}`,10)==0){
          alert.push({titulo:'devolucion con tiempo limite',value:'tiene una devolucion hasta hoy del libro '+data[i].id_documento.titulo+''});
        }

        if(data[i].id_sancion!==null){
          if (data[i].id_sancion.length>0) {
            if(data[i].estado_sancion!=='cancelado' || data[i].estado_sancion!=='pagado'){
              alert.push({titulo:'sancion pendiente',value:'tiene una sancion pendiente por el prestamo del documento de titulo'+data[i].id_documento.titulo+''});
            }
          }
        }
        
        if (data[i].fecha_devolucion!==null) {
          devoluciones.push(data[i]);
        } else {
          prestamos.push(data[i]);
        }
      }
      return {user:userdata,alertas:alert,reservas:reservas,prestamos:prestamos,devoluciones:devoluciones};
    }else{
      
      let userdata = await this.usersService.findAll();
      reservas=reservas.filter((dato:any)=>(dato.estado==='vigente'?true:false));
      //data=data.filter((dato:any)=>(+dato.id_usuario)===userdata?.id?true:false);
      for (let i = 0; i < reservas.length; i++) {
        reservas[i].libro_id=await this.bibliotecasService.findOne(Number(reservas[i].libro_id));
        /*let fecha:any=new Date(reservas.fecha_reserva);
        fecha.setDate(fecha.getDate()+10);
        let ahora:any=new Date();
        if(parseInt(`${((ahora)-fecha)/(1000*60*60*24)}`,10)>0){
          reservas[i].estado='pasado';
          let reser=await this.reservaService.update(reservas[i].id,reservas[i]);
          alert.push({titulo:'reserva archivada',value:'se archivo la reserva de fecha '+reservas[i].fecha_reserva+' del libro de titulo:'+reservas[i].libro_id.titulo});
        }*/
        //reservas[i].libro_id=await this.bibliotecasService.findOne(Number(reservas[i].libro_id));
        reservas[i].libro_id.portada===''||reservas[i].libro_id.portada===null?reservas[i].libro_id.portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):reservas[i].libro_id.portada='data:image/'+(reservas[i].libro_id.portada.includes('.png')?'png':reservas[i].libro_id.portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+reservas[i].libro_id.portada,'base64');
        alert.push({titulo:'reserva por atender',value:'se añadio la reserva de fecha '+reservas[i].fecha_reserva+' del libro de titulo:'+reservas[i].libro_id.titulo});
      }
      let prestamos=[];
      let devoluciones=[];
      
      for (let i = 0; i < data.length; i++) {
        let ap=data[i].fecha_prestamo.split(',');
        ap[0]=ap[0].split('/').reverse().join('-');
        data[i].fecha_prestamo=ap.join(' ');
        data[i].id_documento=await this.bibliotecasService.findOne(Number(data[i].id_documento));
        data[i].id_documento.portada===''||data[i].id_documento.portada===null?data[i].id_documento.portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):data[i].id_documento.portada='data:image/'+(data[i].id_documento.portada.includes('.png')?'png':data[i].id_documento.portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+data[i].id_documento.portada,'base64');
        data[i].id_reserva=await this.reservaService.findOne(Number(data[i].id_reserva));
        let sanciones:any=data[i].id_sancion!==null&&data[i].id_sancion!==''?JSON.parse(data[i].id_sancion):[];
        for (let j = 0; j < sanciones.length; j++) {
          sanciones[j] = await this.sancionService.findOne(Number(sanciones[j])); 
        }
        data[i].id_sancion=sanciones;
        let user=userdata.filter((dato:any)=>(+data[i].id_usuario)===dato.id?true:false);
        let fecha:any=new Date(data[i].fecha_prestamo);
        fecha.setDate(fecha.getDate()+Number(data[i].tiempo_limite));
        let ahora:any=new Date();
        if(data[i].fecha_devolucion!==null&&parseInt(`${((ahora)-fecha)/(1000*60*60*24)}`,10)>0){
          alert.push({titulo:'devolucion con retraso',value:'hay una devolucion con retraso del libro '+data[i].id_documento.titulo+' del usuario '+user[0].usuario});
        }
        if(data[i].fecha_devolucion!==null&&parseInt(`${((ahora)-fecha)/(1000*60*60*24)}`,10)==0){
          alert.push({titulo:'devolucion con tiempo limite',value:'hay una devolucion hasta hoy del libro '+data[i].id_documento.titulo+' del usuario '+user[0].usuario});
        }

        if(data[i].id_sancion!==null){
          if (data[i].id_sancion.length>0) {
            if(data[i].estado_sancion!=='cancelado' || data[i].estado_sancion!=='pagado'){
              alert.push({titulo:'sancion pendiente',value:'hay una sancion pendiente por el prestamo del documento de titulo'+data[i].id_documento.titulo+''});
            }
          }
        }
        
        
        if (data[i].fecha_devolucion!==null) {
          devoluciones.push(data[i]);
        } else {
          prestamos.push(data[i]);
        }
        console.log(alert);
      }
      return {/*user:userdata,*/alertas:alert,reservas:reservas,prestamos:prestamos,devoluciones:devoluciones};
    }


    
    //console.log(user)
    //console.log(userdata)
    //return this.prestamosService.findOne(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prestamosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrestamoDto: UpdatePrestamoDto) {
    updatePrestamoDto.id_sancion=JSON.stringify(updatePrestamoDto.id_sancion);
    console.log(updatePrestamoDto);
    return this.prestamosService.update(+id, updatePrestamoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestamosService.remove(+id);
  }
}
