import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateReservaDto } from './create-reserva.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {

    @ApiPropertyOptional()
    @IsString()
    fecha_reserva:string;
    
    @ApiPropertyOptional()
    @IsString()
    usuario_id:string;

    @ApiPropertyOptional()
    @IsString()
    libro_id:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    estado?:string;

}
