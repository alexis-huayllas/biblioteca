import { Module } from '@nestjs/common';
import { BibliotecasService } from './bibliotecas.service';
import { BibliotecasController } from './bibliotecas.controller';
import { Biblioteca } from './entities/biblioteca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as bcryptjs from 'bcryptjs';
import * as fs from "fs";
import { BitacoraModule } from 'src/bitacora/bitacora.module';
import { UsersModule } from 'src/users/users.module';
import { ContadorModule } from 'src/contador/contador.module';

@Module({
  imports:[MulterModule.register({
    storage: diskStorage({
      destination: './public',
      filename: async (req, file, cd) => {
        const ext = file.mimetype.split('/')[1];
        
        
        let salt= await bcryptjs.genSalt(10);
        var nombre = await bcryptjs.hash(file.originalname.split('.')[0],salt);
        //nombre=nombre;
        nombre=`${nombre.replace(/[\W ]+/g,'')}_${uuidv4()}-${Date.now()}.${ext}`;
        //console.log(nombre);
        //console.log('req',req);
        cd(null, `${nombre}`);
        /*let data= await fs.readFileSync(`./public/${nombre}`);
        if (data) {
          console.log(data);
        }
        if (ext!=="pdf") {
          fs.unlink(`./public/${nombre}`,(err)=>{if(err)throw err;console.log('eliminado');});
        }*/
      },
    })
  }),TypeOrmModule.forFeature([Biblioteca]),BitacoraModule,UsersModule,ContadorModule],
  controllers: [BibliotecasController],
  providers: [BibliotecasService],
  exports: [BibliotecasService],
})
export class BibliotecasModule {}
