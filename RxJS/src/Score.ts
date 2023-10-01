import { Subject, interval, last, map, share, takeWhile, tap } from "rxjs";
import { Draw } from "./Draw";
import { IDrawable } from "./IDrawable";
import { Lavirint } from "./Lavirint/Lavirint";

export enum ScoreValues {
    nextLevel = 10,
    startGame = 120,
    default = 1,
}

export class Score implements IDrawable {

    public lav: Lavirint;
    private score: number = ScoreValues.startGame;
    private scoreLabel: HTMLElement;
    private startInterval$ = new Subject<void>();

    constructor() {}

    public draw(parent: HTMLElement): HTMLElement {
        const container = Draw.div(parent, "div-score div-config-container")
        const key = Draw.label(container, "Score: ", "flex-2")
        this.scoreLabel = Draw.label(container, this.score.toString(), "flex-1");
        this.scoreLabel.style.textAlign = "right";

        this.initStartInterval$();

        return container;
    }

    public increase(value: ScoreValues = ScoreValues.default) {
        this.score += value;
    }

    private initStartInterval$(): void {
        this.startInterval$
        .pipe(
            tap(() => this.score = ScoreValues.startGame),
        )
        .subscribe(() => {
            this.sub2Scores();
        });
        this.startInterval$.next();
    }

    private sub2Scores(): void {
        const score$ = interval(1000)
        .pipe(
            map(() => this.score--),
            takeWhile(p => p > 0),
            share(),
        );

        score$
        .subscribe(() => this.scoreLabel.innerHTML = this.score.toString());

        score$
        .pipe(
            last()
        )
        .subscribe(() => {
            alert("Kraj igre!");
            this.startInterval$.next();
            this.lav.resetGame();
        });
    }
}

export const scoreInstance = new Score();