import Sport from "./sport";

export default interface Match {
    id: number,
    home: string,
    guest: string,
    league: string,
    sport: Sport,
  }