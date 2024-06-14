import { Module } from '@nestjs/common';
import { VisualizacionesService } from './visualizaciones.service';
import { VisualizacionesController } from './visualizaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visualizacion } from './entities/visualizacion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Visualizacion])],
  controllers: [VisualizacionesController],
  providers: [VisualizacionesService],
  exports: [VisualizacionesService],
})
export class VisualizacionesModule {}
