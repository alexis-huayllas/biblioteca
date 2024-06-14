import { Module } from '@nestjs/common';
import { BitacoraController } from './bitacora.controller';
import { BitacoraService } from './bitacora.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bitacora } from './entities/bitacora.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bitacora])],
  controllers: [BitacoraController],
  providers: [BitacoraService],
  exports: [BitacoraService],
})
export class BitacoraModule {}
