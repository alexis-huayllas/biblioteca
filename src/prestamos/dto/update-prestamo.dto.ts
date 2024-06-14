import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePrestamoDto } from './create-prestamo.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePrestamoDto extends PartialType(CreatePrestamoDto) {

    @ApiPropertyOptional()
    @IsString()
    @MinLength(4)
    fecha_prestamo?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    fecha_devolucion?:string;
    
    @ApiPropertyOptional()
    @IsString()
    id_documento?:string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tiempo_limite?:string;
    
    @ApiPropertyOptional()
    @IsString()
    id_reserva?:string;
    
    @ApiPropertyOptional()
    @IsString()
    id_usuario?:string;


    @ApiPropertyOptional()
    @IsString()
    tipoprestamo?:string;

    @ApiPropertyOptional()
    @IsString()
    carrera?:string;

    @ApiPropertyOptional()
    @IsString()
    materia?:string;

    @ApiPropertyOptional()
    @IsString()
    grado?:string;
    
    @ApiPropertyOptional()
    @IsString()
    id_sancion?:string;

    @ApiPropertyOptional()
    @IsString()
    estado_sancion?:string;
}
