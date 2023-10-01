import { ITicket } from "@live-bet/dto";
import { TicketStatus } from "@live-bet/enums";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity()
export class Ticket implements ITicket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: TicketStatus.payInEnabled, })
    status: string;
    
    @Column()
    stake: number;

    @OneToMany(() => Event, (event) => event.ticket, {
        orphanedRowAction: "delete",
        cascade: true,
    })
    events: Event[];
}