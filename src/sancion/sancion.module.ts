import { Module } from '@nestjs/common';
import { SancionService } from './sancion.service';
import { SancionController } from './sancion.controller';
import { Sancion } from './entities/sancion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Sancion])],
  controllers: [SancionController],
  providers: [SancionService],
  exports: [SancionService],
})
export class SancionModule {}
