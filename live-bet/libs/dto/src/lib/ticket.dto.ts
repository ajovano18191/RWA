import { OddsKey } from "@live-bet/dto";
import { TicketType } from "@live-bet/enums";

export interface TicketDTO {
    stake: number,
    type: TicketType,
    events: OddsKey[],
}