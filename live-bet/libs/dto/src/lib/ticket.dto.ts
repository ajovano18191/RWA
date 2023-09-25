import { OddsKey } from "@live-bet/dto";

export interface TicketDTO {
    stake: number,
    events: OddsKey[],
}