import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Sancion {
    @Column({primary:true,generated:true})
    id:number;

    @Column({default:''})
    detalle:string;

    @Column({default:''})
    penalizacion:string;

    @Column()
    multa:string;

    @CreateDateColumn()
    CreatedAt:Date;

    @UpdateDateColumn()
    UpdatedAt:Date;

    @DeleteDateColumn()
    DeletedAt:Date;
}
