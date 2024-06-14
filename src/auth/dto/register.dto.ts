import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {

  @ApiPropertyOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(4)
  name?:string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  last_name?:string;

  @ApiProperty()
  @Transform(({value}) => value.trim())
  usuario:string;

  @ApiProperty()
  @Transform(({value}) => value.trim())
  @MinLength(6)
  @IsString()
  password:string;
}
