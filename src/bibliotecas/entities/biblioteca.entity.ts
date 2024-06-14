import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Biblioteca {
    @Column({primary:true,generated:true})
    id:number;

    @Column()
    titulo:string;

    //@Column({default:""})
    //tituloColeccion:string;

    @Column({default:""})
    anoPublicacion:string;

    @Column({default:""})
    editorial:string;

    @Column({default:""})
    edicion:string;

    @Column({default:""})
    volumen:string;

    @Column({default:""})
    isbn:string;

    @Column({default:"Anonimo"})
    autor:string;

    @Column({nullable:true})
    archivo:string;

    @Column({nullable:true})
    portada:string;

    @Column({default:"0"})
    cantidad:string;

    @Column({default:""})
    reseña:string;

    @Column({nullable:true})
    palabras_clave:string;

    @Column({default:"fisico"})
    tipo:string;

    @Column({default:""})
    tutor:string;

    @Column({default:"libro"})
    seleccion:string;

    @Column({default:""})
    modalidad:string;

    @Column({default:""})//comprado o donado del libro
    adquisicion:string;

    @Column({default:""})//copia o original
    tipolibro:string;

    @Column({default:""})
    categoria:string;

    @Column({type: "enum",default: "no",enum:["si","no"]})
    cd:string;

    @Column({type: "enum",default: "disponible",enum:["disponible","no disponible","de baja"]})
    estado:string;

    @CreateDateColumn()
    CreatedAt:Date;

    @UpdateDateColumn()
    UpdatedAt:Date;

    @DeleteDateColumn()
    DeletedAt:Date;
}
