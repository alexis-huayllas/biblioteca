import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export class CreateBibliotecaDto {

    @ApiProperty()
    @IsString()
    @MinLength(4)
    titulo?:string;

    @ApiProperty()
    @IsString()
    autor?:string;

    @ApiProperty()
    @IsString()
    reseña:string;
    
    @ApiProperty()
    @IsString()
    palabras_clave:string;
    
    @ApiProperty()
    @IsString()
    tipo:string;
    
    @ApiProperty({example:"disponible",enum:["disponible","no disponible","de baja"]})
    @IsString()
    estado:string;

    @ApiPropertyOptional({type:'file'})
    @IsString()
    @IsOptional()
    archivo?:string;

    @ApiPropertyOptional({type:'file'})
    @IsString()
    @IsOptional()
    portada?:string;


    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    cantidad?:string;

    @ApiProperty()
    tutor:string;
    
    @ApiProperty()
    seleccion:string;

    @ApiProperty()
    modalidad?:string;

    @ApiProperty()
    cd?:string;

    
    @ApiProperty()
    adquisicion?:string;
    
    @ApiProperty()
    tipolibro?:string;

    
    //@ApiProperty()
    //tituloColeccion:string;
    
    @ApiProperty()
    anoPublicacion:string;
    
    @ApiProperty()
    editorial:string;
    
    @ApiProperty()
    edicion:string;
    
    @ApiProperty()
    volumen:string;
    
    @ApiProperty()
    isbn:string;


}
