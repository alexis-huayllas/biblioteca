import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Bitacora {
    @Column({primary:true,generated:true})
    id:number;

    @Column()
    fecha_evento:string;

    @Column()
    detalle:string;

    @Column()
    contenido:string;

    @Column({nullable:true})
    usuario_id:string;

    @Column({type: "enum",default: "registro",enum:["registro","sesiones","alertas","errores"]})
    tipo:string;

    @Column({type: "enum",default: "disponible",enum:["disponible","no disponible"]})
    estado:string;

    @CreateDateColumn()
    CreatedAt:Date;

    @UpdateDateColumn()
    UpdatedAt:Date;

    @DeleteDateColumn()
    DeletedAt:Date;
}
