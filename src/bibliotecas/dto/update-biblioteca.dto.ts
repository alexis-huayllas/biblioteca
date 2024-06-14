import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBibliotecaDto } from './create-biblioteca.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateBibliotecaDto extends PartialType(CreateBibliotecaDto) {

    @ApiPropertyOptional()
    @IsString()
    @MinLength(4)
    titulo?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    autor?:string;

    @ApiPropertyOptional()
    @IsString()
    reseña?:string;
    
    @ApiPropertyOptional()
    @IsString()
    palabras_clave?:string;
    
    @ApiPropertyOptional()
    @IsString()
    tipo?:string;
    
    @ApiPropertyOptional({example:"disponible",enum:["disponible","no disponible","de baja"]})
    @IsString()
    estado?:string;


    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    archivo?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    portada?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    cantidad?:string;

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tutor?:string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    seleccion?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    modalidad?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    cd?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    adquisicion?:string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tipolibro?:string;
    


    /*@ApiPropertyOptional()
    @IsString()
    tituloColeccion?:string;*/
    
    @ApiPropertyOptional()
    @IsString()
    anoPublicacion?:string;
    
    @ApiPropertyOptional()
    @IsString()
    editorial?:string;
    
    @ApiPropertyOptional()
    @IsString()
    edicion?:string;
    
    @ApiPropertyOptional()
    @IsString()
    volumen?:string;
    
    @ApiPropertyOptional()
    @IsString()
    isbn?:string;


}
