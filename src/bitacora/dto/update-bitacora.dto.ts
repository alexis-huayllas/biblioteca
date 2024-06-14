import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateBitacoraDto } from './create-bitacora.dto';

export class UpdateBitacoraDto extends PartialType(CreateBitacoraDto) {
    
    @ApiPropertyOptional()
    @IsString()
    fecha_evento?:string;
    
    @ApiPropertyOptional()
    @IsString()
    detalle?:string;
    
    @ApiPropertyOptional()
    @IsString()
    contenido?:string;

    @ApiPropertyOptional()
    @IsString()
    usuario_id?:string;

    @ApiPropertyOptional()
    @IsString()
    estado?:string;






}
