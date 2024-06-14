import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Prestamo {
    @Column({primary:true,generated:true})
    id:number;

    @Column({nullable:true})
    fecha_prestamo:string;

    @Column({default:"1"})
    tiempo_limite:string;

    @Column({nullable:true})
    fecha_devolucion:string;

    @Column()
    id_documento:string;

    @Column({nullable:true})
    id_reserva:string;

    @Column()
    id_usuario:string;

    @Column({nullable:true})
    id_sancion:string;

    @Column({default:'externo'})
    tipoprestamo:string;

    @Column({default:''})
    carrera:string;

    @Column({default:''})
    materia:string;

    @Column({default:'primer año'})
    grado:string;

    @Column({nullable:true})
    estado_sancion:string;

    @CreateDateColumn()
    CreatedAt:Date;

    @UpdateDateColumn()
    UpdatedAt:Date;

    @DeleteDateColumn()
    DeletedAt:Date;
}
