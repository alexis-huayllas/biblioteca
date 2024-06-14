import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSancionDto } from './create-sancion.dto';
import { IsString } from 'class-validator';

export class UpdateSancionDto extends PartialType(CreateSancionDto) {

    @ApiPropertyOptional()
    @IsString()
    detalle?:string;
    
    @ApiPropertyOptional()
    @IsString()
    penalizacion?:string;
    
    @ApiPropertyOptional()
    @IsString()
    multa?:string;
}
