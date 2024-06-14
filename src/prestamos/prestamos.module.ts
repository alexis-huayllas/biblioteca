import { Module } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { Prestamo } from './entities/prestamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaModule } from 'src/reserva/reserva.module';
import { BibliotecasModule } from 'src/bibliotecas/bibliotecas.module';
import { UsersModule } from 'src/users/users.module';
import { SancionModule } from 'src/sancion/sancion.module';

@Module({
  imports:[ReservaModule,BibliotecasModule,UsersModule,SancionModule,TypeOrmModule.forFeature([Prestamo])],
  controllers: [PrestamosController],
  providers: [PrestamosService],
  exports: [PrestamosService],
})
export class PrestamosModule {}
