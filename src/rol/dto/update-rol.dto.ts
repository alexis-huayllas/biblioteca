import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRolDto } from './create-rol.dto';
import { IsString } from 'class-validator';

export class UpdateRolDto extends PartialType(CreateRolDto) {

    @ApiPropertyOptional()
    @IsString()
    nombre?:string;
}
