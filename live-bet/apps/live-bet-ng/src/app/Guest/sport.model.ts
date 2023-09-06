import Game from "./game.model";
import Match from "./match.model";

export default interface Sport {
    id: number,
    name: string,
    matches: Match[],
    games: Game[],
}