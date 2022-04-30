import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

import { v4 as uuid } from "uuid";


@Entity('car_image')
class CarImage{

    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    createdAt: Date;


    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export{CarImage}