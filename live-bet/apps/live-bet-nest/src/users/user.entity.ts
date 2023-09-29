import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column({ default: 'worker', })
    role: string;
}