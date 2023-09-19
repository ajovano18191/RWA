import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";
import { ITicket } from "@live-bet/dto";

@Entity()
export class Ticket implements ITicket {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    type: string;

    @Column()
    stake: number;

    @OneToMany(() => Event, (event) => event.ticket, {
        orphanedRowAction: "delete",
        cascade: true,
    })
    events: Event[];
}