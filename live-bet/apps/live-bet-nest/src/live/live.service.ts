import { MatchOfferDTO } from '@live-bet/dto';
import { WsMessages } from '@live-bet/enums';
import { Inject, Injectable } from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Subject } from 'rxjs';
import { Match } from '../matches/match.entity';
import { MatchesService } from '../matches/matches.service';

@Injectable()
export class LiveService {
    completeOffer: Map<number, MatchOfferDTO> = new Map<number, MatchOfferDTO>();
    offer$: Subject<WsResponse<MatchOfferDTO>> = new Subject<WsResponse<MatchOfferDTO>>();
  
    constructor(
      @Inject(MatchesService)
      private matchesService: MatchesService,
    ) {
      // this.completeOffer = matchesService.getMatchesOffer();
    }

    sendOffer(data: MatchOfferDTO): void {
        this.completeOffer.set(data.matchId, data);
        this.offer$.next({ event: WsMessages.oneOffer, data: data });
        console.log(WsMessages.sendOffer, data);
    }

    sub2Offer(): Subject<WsResponse<MatchOfferDTO>> {
      console.log(WsMessages.sub2Offers);
      return this.offer$;
    }

    async getCompleteOffer(client: Socket): Promise<void>  { 
      const completeOfferJSON: MatchOfferDTO[] = this.map2JSON();
      client.emit(WsMessages.completeOffer, completeOfferJSON);
      console.log(WsMessages.completeOffer, completeOfferJSON);
    }
  
    private map2JSON(): MatchOfferDTO[] {
      const arr: MatchOfferDTO[] = [];
      for(const kvp of this.completeOffer) {
        arr.push(kvp[1]);
      }
      return arr;
    }

    async startMatch(matchOfferDTO: MatchOfferDTO) {
      await this.matchesService.startMatch(matchOfferDTO);
      this.completeOffer.set(matchOfferDTO.matchId, matchOfferDTO);
      this.offer$.next({ event: WsMessages.startMatch, data: matchOfferDTO });
    }

    async endMatch(id: number) {
      const match: Match = await this.matchesService.findOne(id);
      this.completeOffer.delete(match.id);
      await this.matchesService.endMatch(match);
      this.offer$.next({ event: WsMessages.endMatch, data: {
        sportId: match.sportId,
        matchId: match.id,
        offers: [],
      } });
    }
}
