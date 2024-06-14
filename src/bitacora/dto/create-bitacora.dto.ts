import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateBitacoraDto {

    @ApiProperty()
    @IsString()
    fecha_evento:string;
    
    @ApiProperty()
    @IsString()
    detalle:string;
    
    @ApiProperty()
    @IsString()
    contenido:string;
    
    @ApiPropertyOptional()
    usuario_id?:string;
    
    @ApiPropertyOptional()
    estado?:string;







}
