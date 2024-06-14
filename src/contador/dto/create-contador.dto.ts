import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateContadorDto {
    
    @ApiProperty()
    @IsNumber()
    inicios_sesion:number;
    
    @ApiProperty()
    @IsString()
    usuario_id:string;
    
    @ApiProperty()
    @IsString()
    libro_id:string;

}
