import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateVisualizacioneDto } from './create-visualizacione.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateVisualizacioneDto extends PartialType(CreateVisualizacioneDto) {
    
    @ApiPropertyOptional()
    @IsNumber()
    numero_vistas?:number;
    
    /*@ApiPropertyOptional()
    @IsString()
    documento_id?:string;
    
    @ApiPropertyOptional()
    @IsString()
    usuario_id?:string;*/
}
