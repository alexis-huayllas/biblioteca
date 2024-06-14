import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Reserva {
    @Column({primary:true,generated:true})
    id:number;

    @Column({default:""})
    fecha_reserva:string;

    @Column()
    libro_id:string;

    @Column()
    usuario_id:string;

    @Column({type: "enum",default: "vigente",enum:["vigente","pasado","prestado","rechazado"]})
    estado:string;

    @CreateDateColumn()
    CreatedAt:Date;

    @UpdateDateColumn()
    UpdatedAt:Date;

    @DeleteDateColumn()
    DeletedAt:Date;
}
