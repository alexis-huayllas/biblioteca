import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional()
    @IsString()
    @MinLength(2)
    @IsOptional()
    name?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    last_name?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    usuario?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    password?:string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    estado?: string;

}
