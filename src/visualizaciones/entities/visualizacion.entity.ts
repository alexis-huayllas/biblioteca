import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Visualizacion {
    @Column({primary:true,generated:true})
    id:number;

    @Column({default:0})
    numero_vistas:number;

    //@Column()
    //documento_id:string;

    //@Column()
    //usuario_id:string;

    @CreateDateColumn()
    CreatedAt:Date;

    @UpdateDateColumn()
    UpdatedAt:Date;

    @DeleteDateColumn()
    DeletedAt:Date;
}
