import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BibliotecasModule } from './bibliotecas/bibliotecas.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { RolModule } from './rol/rol.module';
import { ReservaModule } from './reserva/reserva.module';
import { SancionModule } from './sancion/sancion.module';
import { VisualizacionesModule } from './visualizaciones/visualizaciones.module';
import { ContadorModule } from './contador/contador.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'base_datos',
    database: 'arquitectura',
    autoLoadEntities: true,
    synchronize: true,
  }),/*TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'db_crud',
    autoLoadEntities: true,
    synchronize: true,
  }), */UsersModule,AuthModule, BibliotecasModule, PrestamosModule, RolModule, ReservaModule, SancionModule, VisualizacionesModule, ContadorModule],
  controllers: [AppController],
  providers: [AppService,AppGateway]//,
  //exports: [ AppGateway ]
})
export class AppModule {}
