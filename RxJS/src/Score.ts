import { Observable, Subject, filter, interval, last, map, share, takeWhile, tap } from "rxjs";
import { Draw } from "./Draw";
import { IDrawable } from "./IDrawable";
import { Lavirint } from "./Lavirint/Lavirint";

export enum ScoreValues {
    nextLevel = 10,
    startGame = 10,
    default = 1,
}

export class Score implements IDrawable {

    private score: number = ScoreValues.startGame;
    private scoreLabel: HTMLElement;
    private startInterval$ = new Subject<void>();

    constructor(private lav: Lavirint) {}

    public draw(parent: HTMLElement): HTMLElement {
        const container = Draw.div(parent, "div-score")
        const key = Draw.label(container, "Score: ")
        this.scoreLabel = Draw.label(container, this.score.toString())

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
            tap(p => console.log(p)),
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