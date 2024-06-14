import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Res, HttpStatus, ParseFilePipeBuilder, UploadedFiles } from '@nestjs/common';
import { BibliotecasService } from './bibliotecas.service';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import * as fs from "fs";
import { defaultOptionListAppearanceProvider, PDFDocument } from 'pdf-lib';
import { ActiveUser } from 'src/auth/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/auth/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/common/enums/rol.enum';
import { BitacoraService } from 'src/bitacora/bitacora.service';
import { UsersService } from 'src/users/users.service';
import { CreateBitacoraDto } from 'src/bitacora/dto/create-bitacora.dto';
import { Bitacora } from 'src/bitacora/entities/bitacora.entity';
import { Biblioteca } from './entities/biblioteca.entity';
import { ContadorService } from '../contador/contador.service';

@Controller('bibliotecas')
@ApiTags('biblioteca')
export class BibliotecasController {
  constructor(private readonly bibliotecasService: BibliotecasService,
    private readonly bitacoraService: BitacoraService,
    private readonly contadorService: ContadorService,
    private readonly usersService: UsersService) {}

  @Post()
  //@ApiQuery({ type: CreateBibliotecaDto})
  @Auth(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(/*FileInterceptor('archivo')*/FileFieldsInterceptor([{name:'archivo',maxCount:1},{name:'portada',maxCount:1}]))
  async create(@Res() response:any,@Req() request:Request,@Body() createBibliotecaDto: CreateBibliotecaDto,/*@UploadedFile( new ParseFilePipeBuilder().build({fileIsRequired: false}) ) archivo: Express.Multer.File,*/@UploadedFiles( new ParseFilePipeBuilder().build({fileIsRequired: false})) files: {archivo?: Express.Multer.File[], portada?: Express.Multer.File[]},@ActiveUser() user: UserActiveInterface) {
    //console.log(request);
    //console.log('files',files);
    //console.log('files.archivo',files.archivo);
    //console.log('files.portada',files.portada);
    let usuario:any= await this.usersService.findOneByEmail(user.usuario);
    let bitacora=new Bitacora;
    bitacora.fecha_evento=new Date().toLocaleString();
    bitacora.detalle='Adicion de un archivo por parte del usuario '+usuario.usuario+' con codigo ID Nro '+usuario.id;
    bitacora.usuario_id=''+usuario.id;
    //let bitacora:CreateBitacoraDto={fecha_evento:new Date().toLocaleString(),usuario_id:'1'};
    //let data={dat:createBibliotecaDto,file:archivo}
    //console.log(archivo);
    files.portada!==undefined?createBibliotecaDto.portada=files.portada[0].filename:createBibliotecaDto.portada=undefined;
    //console.log(createBibliotecaDto);
    if (files.archivo!==undefined) {
      if (files.archivo[0].mimetype.split('/')[1]==='pdf') {
        createBibliotecaDto.archivo=files.archivo[0].filename;
        //files.portada!==undefined?createBibliotecaDto.portada=files.portada[0].filename:createBibliotecaDto.portada=undefined;
        //createBibliotecaDto.tipo='digital';
        bitacora.contenido='se realizo la adicion del archivo '+files.archivo[0].filename;
      }
      else{
        fs.unlink(`./public/${files.archivo[0].filename}`,(err)=>{if(err)/*throw err;console.log('eliminado');*/console.log(err);});
        files.portada!==undefined?fs.unlink(`./public/${files.portada[0].filename}`,(err)=>{if(err)/*throw err;console.log('eliminado');*/console.log(err);}):'';
        bitacora.contenido='se produjo un error en la adicion del archivo '+files.archivo[0].filename+' por el tipo de extension, teniendo detalle de datos asignados de la peticion:'+JSON.stringify(createBibliotecaDto).replaceAll(',',', ');
        bitacora.tipo='error';
        const bitacoradata= await this.bitacoraService.create(bitacora);
        return response.status(HttpStatus.BAD_REQUEST).json({status:400,error:'error de formato de archivo'});
      }
    }
    else{
      createBibliotecaDto.archivo=undefined;
    }
    if (JSON.parse(JSON.stringify(createBibliotecaDto))['reseÃ±a']!==undefined) {
      createBibliotecaDto.reseña=JSON.parse(JSON.stringify(createBibliotecaDto))['reseÃ±a'];
    }
    

    
    //return data;
    //return await this.bibliotecasService.create(createBibliotecaDto);
    const newAddBiblioteca = await this.bibliotecasService.create(createBibliotecaDto);
    bitacora.contenido=bitacora.contenido+', siendo la creacion con los siguientes datos: '+JSON.stringify(createBibliotecaDto).replaceAll(',',', ');
    bitacora.tipo='registro';
    const bitacoradata= await this.bitacoraService.create(bitacora);
    return response.status(HttpStatus.CREATED).json({
        newAddBiblioteca
    })
    //return response.status(HttpStatus.CREATED).json({data})

  }

  @Post('buscar/data/type')
  async Buscar(@Res() response:any,@Req() request:Request,@Body() buscar: any):Promise<Biblioteca[]> {
    //console.log(buscar);
    //return await this.bibliotecasService.buscar(buscar.buscar);
    let data:Biblioteca[]= await this.bibliotecasService.buscar(buscar.buscar,buscar.orden);
    return response.status(HttpStatus.CREATED).json({data});
  }

  @Get()
  findAll() {
    return this.bibliotecasService.findAll();
  }

  @Get('digital')
  findDigital() {
    return this.bibliotecasService.findDigital();
  }
  @Get('fisico')
  findFisico() {
    return this.bibliotecasService.findFisico();
  }

  @Get('bajas')
  findBajas() {
    return this.bibliotecasService.findAllBaja();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bibliotecasService.findOne(+id);
  }

  @Get(':id/:page')
  @Auth(Role.EXTERNO)
  async findOnePage(@Param('id') id: string,@Param('page') page: string,@Res() response:any,@ActiveUser() user: UserActiveInterface) {
    let datos:any = await this.bibliotecasService.findOnePage(+id);
    
    if(page==='1'){
      let usuario:any= await this.usersService.findOneByEmail(user.usuario);
      let countdata:any= await this.contadorService.findAlltoOne(usuario.id,+id);
        if(user.role!==Role.SUPERUSER&&user.role!==Role.ADMIN){
          if (countdata.contador===0) {
            if(datos?.seleccion==='tesis'){
              let countdatacreate:any= await this.contadorService.create({inicios_sesion:1,usuario_id:usuario.id,libro_id:id});
            }
        }else{
          if (countdata.contador>3) {
            return response.status(HttpStatus.BAD_REQUEST).json({message:'no se puede acceder a este recurso por el limite de vistas'})
          }else{
            let countdatacreate:any= await this.contadorService.update(countdata.data[0].id,{inicios_sesion:Number(countdata.data[0].inicios_sesion)+1});
          }
        }
      }
      
      //let usuario:any= await this.usersService.findOneByEmail(user.usuario);
      let bitacora=new Bitacora;
      bitacora.fecha_evento=new Date().toLocaleString();
      bitacora.detalle='verificacion de un libro por parte del usuario '+usuario.usuario+' con codigo ID Nro '+usuario.id;
      bitacora.usuario_id=''+usuario.id;
      bitacora.tipo='registro';
      bitacora.contenido='se accedio a la verificacion del libro '+datos?.titulo;
      bitacora.contenido=bitacora.contenido+', siendo la verificacion con los siguientes datos: '+JSON.stringify(datos).replaceAll(',',', ');
      const bitacoradata= await this.bitacoraService.create(bitacora);
    }
    datos.portada===''||datos.portada===null?datos.portada='data:image/png;base64,'+ fs.readFileSync('./public/noimage.png','base64'):datos.portada='data:image/'+(datos.portada.includes('.png')?'png':datos.portada.includes('.jpg')?'jpg':'jpeg')+';base64,'+ fs.readFileSync('./public/'+datos.portada,'base64');
      if(datos?.archivo!==null){let file=fs.readFileSync('./public/'+datos?.archivo,'base64');
    //console.log('file',file);
    //console.log('datos',datos);
    //console.log(__dirname.replace('\\dist\\bibliotecas','')+'/public/'+datos?.archivo);
    //const response = await fetch(__dirname.replace('\\dist\\bibliotecas','')+'/public/'+datos?.archivo);
    //const arrayBuffer = await response.arrayBuffer();

    const pdfDoc = await PDFDocument.load(file);
    const numPaginas = pdfDoc.getPageCount();

    let numeropagina=0;
    if (parseInt(page)>numPaginas) {
      numeropagina=numPaginas-1;
    } else {
      numeropagina=(parseInt(page)-1);
    }

    const pdfNewDoc = await PDFDocument.create();
    let pagedata = await pdfNewDoc.copyPages(pdfDoc,[numeropagina]);
    
    pagedata.forEach((page) => pdfNewDoc.addPage(page));
    const newpdf = await pdfNewDoc.saveAsBase64();
    //const numPagina = pdfNewDoc.getPageCount();
    //return newpdf;
    //let im=pdfDoc.saveAsBase64();

    //console.log(`El archivo tiene ${numPaginas} página(s).`);
    //console.log(numPaginas);
    //console.log('numPaginas',numPagina);
    //console.log(pagedata);
    //console.log('im',newpdf);

    //let data={id:id,page:page,datos:datos,file:JSON.stringify(file),numPaginas:numPaginas,pagedata:pagedata,im:newpdf};
    //return {archivo:newpdf,lim:numPaginas,databook:datos};
    return response.status(HttpStatus.OK).json({
      archivo:newpdf,lim:numPaginas,databook:datos
  });}else{
    return response.status(HttpStatus.OK).json({
      archivo:'',lim:0,databook:datos
  });}
  }

  @Get('order/:value/data')
  findOrderAllDigital(@Param('value') value: string) {
    return this.bibliotecasService.findOrderAllDigital(value);
  }

  @Get('take/all/digital')
  async takeAllDataDigital() {
    return await this.bibliotecasService.takeAllDigital();
  }

  /*@Get('takeFisico')
  takeAllDataFisico() {
    return this.bibliotecasService.findFisico();
  }*/

  @Patch(':id')
  @Auth(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(/*FileInterceptor('archivo')*/FileFieldsInterceptor([{name:'archivo',maxCount:1},{name:'portada',maxCount:1}]))
  async update(@Res() response:any, @Param('id') id: string, @Body() updateBibliotecaDto: UpdateBibliotecaDto, @UploadedFiles( new ParseFilePipeBuilder().build({fileIsRequired: false})) files: {archivo?: Express.Multer.File[], portada?: Express.Multer.File[]},@ActiveUser() user: UserActiveInterface) {
    let copy = await this.bibliotecasService.findOne(+id);
    
    
    let usuario:any= await this.usersService.findOneByEmail(user.usuario);
      let bitacora=new Bitacora;
      bitacora.fecha_evento=new Date().toLocaleString();
      bitacora.detalle='actualizacion de un libro por parte del usuario '+usuario.usuario+' con codigo ID Nro '+usuario.id;
      bitacora.usuario_id=''+usuario.id;
      bitacora.tipo='registro';
      bitacora.contenido='se accedio a la modificacion del libro ';
    files.portada!==undefined?updateBibliotecaDto.portada=files.portada[0].filename:updateBibliotecaDto.portada=copy?.portada;
    if (files.archivo!==undefined) {
      if (files.archivo[0].mimetype.split('/')[1]==='pdf') {
        updateBibliotecaDto.archivo=files.archivo[0].filename;
        //files.portada!==undefined?updateBibliotecaDto.portada=files.portada[0].filename:updateBibliotecaDto.portada=undefined;
        //updateBibliotecaDto.tipo='digital';
        bitacora.contenido='se realizo la adicion del archivo '+files.archivo[0].filename;
      }
      else{
        fs.unlink(`./public/${files.archivo[0].filename}`,(err)=>{if(err)/*throw err;console.log('eliminado');*/console.log(err);});
        files.portada!==undefined?fs.unlink(`./public/${files.portada[0].filename}`,(err)=>{if(err)/*throw err;console.log('eliminado');*/console.log(err);}):'';
        bitacora.contenido='se produjo un error en la adicion del archivo '+files.archivo[0].filename+' por el tipo de extension, teniendo detalle de datos asignados de la peticion:'+JSON.stringify(updateBibliotecaDto).replaceAll(',',', ');
        bitacora.tipo='error';
        const bitacoradata= await this.bitacoraService.create(bitacora);
        return response.status(HttpStatus.BAD_REQUEST).json({status:400,error:'error de formato de archivo'});
      }
    }
    else{
      updateBibliotecaDto.archivo=copy?.archivo;
    }
    if (JSON.parse(JSON.stringify(updateBibliotecaDto))['reseÃ±a']!==undefined) {
      updateBibliotecaDto.reseña=JSON.parse(JSON.stringify(updateBibliotecaDto))['reseÃ±a'];
      //console.log(updateBibliotecaDto);
      let data:any=updateBibliotecaDto;
      //console.log(data);
      delete data['reseÃ±a'];
      //let dato:UpdateBibliotecaDto=data;
      updateBibliotecaDto=data;
      //console.log(updateBibliotecaDto);
    }
    if(updateBibliotecaDto.archivo!==copy?.archivo){
      fs.unlink(`./public/${updateBibliotecaDto.archivo}`,(err)=>{if(err)/*throw err;console.log('eliminado');*/console.log(err);});
    }
    if(updateBibliotecaDto.portada!==copy?.portada){
      fs.unlink(`./public/${updateBibliotecaDto.portada}`,(err)=>{if(err)/*throw err;console.log('eliminado');*/console.log(err);});
    }
    bitacora.contenido=bitacora.contenido+', siendo la modificacion con los siguientes datos previa eliminacion de sus archivos: '+JSON.stringify(copy).replaceAll(',',', ');
    bitacora.contenido=bitacora.contenido+', a los siguientes datos: '+JSON.stringify(updateBibliotecaDto).replaceAll(',',', ');
    const bitacoradata= await this.bitacoraService.create(bitacora);
    
    console.log(updateBibliotecaDto);
   
    const newAddBiblioteca=await this.bibliotecasService.update(+id, updateBibliotecaDto);
    return response.status(HttpStatus.CREATED).json({
      newAddBiblioteca
  })
  }

  @Patch(':id/data')
  @Auth(Role.ADMIN)
  async updatedata(@Res() response:any, @Param('id') id: string, @Body() updateBibliotecaDto: UpdateBibliotecaDto, @ActiveUser() user: UserActiveInterface) {
    //let copy = await this.bibliotecasService.findOne(+id);
    //console.log('copy',copy);
    console.log('updateBibliotecaDto',updateBibliotecaDto);
    const newAddBiblioteca=await this.bibliotecasService.update(+id, updateBibliotecaDto);
    return response.status(HttpStatus.CREATED).json({
      newAddBiblioteca
    });
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  async remove(@Param('id') id: string,@ActiveUser() user: UserActiveInterface) {
    let usuario:any= await this.usersService.findOneByEmail(user.usuario);
    let bitacora=new Bitacora;
    bitacora.fecha_evento=new Date().toLocaleString();
    bitacora.detalle='eliminacion de un libro por parte del usuario '+usuario.usuario+' con codigo ID Nro '+usuario.id;
    bitacora.usuario_id=''+usuario.id;
    bitacora.tipo='registro';
    bitacora.contenido='se accedio a la eliminacion del libro con id:'+id;
    const bitacoradata= await this.bitacoraService.create(bitacora);
    return this.bibliotecasService.remove(+id);
  }
}
