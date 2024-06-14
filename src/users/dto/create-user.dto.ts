import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {


    @ApiPropertyOptional()
    @IsString()
    @MinLength(2)
    name?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    last_name?:string;

    @ApiProperty()
    @IsString()
    usuario:string;

    @ApiProperty()
    @IsString()
    password:string;

    @ApiPropertyOptional()
    @IsString()
    estado?: string;

}
