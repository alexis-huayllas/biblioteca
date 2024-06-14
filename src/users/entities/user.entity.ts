import { Role } from "src/auth/common/enums/rol.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @Column({primary:true,generated:true})
    id:number;

    @Column()
    name:string;

    @Column()
    last_name:string;

    @Column({unique:true, nullable:false})
    usuario:string;

    @Column({nullable:false})
    password:string;

    @Column({ type: 'enum', default: Role.EXTERNO, enum: Role })
    role: Role;

    @Column({ type: 'enum', default: 'disponible', enum: ['disponible', 'no disponible', 'de baja'] })
    estado: string;

    @CreateDateColumn()
    CreatedAt:Date;

    @UpdateDateColumn()
    UpdatedAt:Date;

    @DeleteDateColumn()
    DeletedAt:Date;
}
