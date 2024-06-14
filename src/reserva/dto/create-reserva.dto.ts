import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateReservaDto {
    
    @ApiProperty()
    @IsString()
    fecha_reserva:string;
    
    @ApiProperty()
    @IsString()
    usuario_id:string;

    @ApiProperty()
    @IsString()
    libro_id:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    estado?:string;

}
