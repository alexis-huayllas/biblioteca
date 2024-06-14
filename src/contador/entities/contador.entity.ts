import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Contador {
    @Column({primary:true,generated:true})
    id:number;

    @Column({default:0})
    inicios_sesion:number;

    @Column()
    usuario_id:string;
    
    @Column()
    libro_id:string;

    @CreateDateColumn()
    CreatedAt:Date;

    @UpdateDateColumn()
    UpdatedAt:Date;

    @DeleteDateColumn()
    DeletedAt:Date;
}
