import Game from "./game";
import Match from "./match";

export default interface Sport {
    id: number,
    name: string,
    matches: Match[],
    games: Game[],
}