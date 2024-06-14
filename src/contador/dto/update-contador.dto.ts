import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateContadorDto } from './create-contador.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateContadorDto extends PartialType(CreateContadorDto) {

    @ApiPropertyOptional()
    @IsNumber()
    inicios_sesion?:number;
    
    @ApiPropertyOptional()
    @IsString()
    usuario_id?:string;

    @ApiPropertyOptional()
    @IsString()
    libro_id?:string;
    
}
