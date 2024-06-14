import { Module } from '@nestjs/common';
import { ContadorService } from './contador.service';
import { ContadorController } from './contador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contador } from './entities/contador.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Contador])],
  controllers: [ContadorController],
  providers: [ContadorService],
  exports: [ContadorService],
})
export class ContadorModule {}
