import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateVisualizacioneDto {

    @ApiPropertyOptional()
    @IsNumber()
    numero_vistas?:number;
    
    /*@ApiProperty()
    @IsString()
    documento_id:string;
    
    @ApiProperty()
    @IsString()
    usuario_id:string;
*/
}
