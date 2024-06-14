import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class CreatePrestamoDto {
    
    @ApiPropertyOptional()
    @IsString()
    @MinLength(4)
    fecha_prestamo?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    fecha_devolucion?:string;

    @ApiProperty()
    @IsString()
    id_documento:string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tiempo_limite?:string;
    
    @ApiPropertyOptional()
    @IsString()
    id_reserva?:string;
    
    @ApiProperty()
    @IsString()
    id_usuario:string;


    @ApiProperty()
    @IsString()
    tipoprestamo:string;

    @ApiPropertyOptional()
    @IsString()
    carrera?:string;

    @ApiProperty()
    @IsString()
    materia:string;

    @ApiPropertyOptional()
    @IsString()
    grado?:string;
    
    @ApiPropertyOptional()
    @IsString()
    id_sancion:string;
    
    @ApiPropertyOptional()
    @IsString()
    estado_sancion?:string;
}
