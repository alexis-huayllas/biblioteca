import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateSancionDto {

    @ApiProperty()
    @IsString()
    detalle:string;
    
    @ApiProperty()
    @IsString()
    penalizacion:string;
    
    @ApiProperty()
    @IsString()
    multa:string;

}
