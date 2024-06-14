import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRolDto {

    @ApiProperty()
    @IsString()
    nombre:string;
}
