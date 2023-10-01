import { Observable, filter, from, fromEvent, map, merge, pairwise, scan, shareReplay, switchMap, withLatestFrom } from "rxjs";
import { Draw } from "../Draw";
import { IDrawable } from "../IDrawable";
import { Wall } from "../LavirintItems/Wall";
import { Level } from "../Level";
import { Player } from "../Player";
import { Direction, Position } from "../Position";
import { ScoreValues, scoreInstance } from "../Score";
import { LavirintConfigurator } from "./LavirintConfigurator";
import { LavirintDrawer } from "./LavirintDrawer";
import { LavirintMatrix } from "./LavirintMatrix";

export class Lavirint implements IDrawable {

    public lavMat$: Observable<LavirintMatrix> = new Observable<LavirintMatrix>();

    private lavirintDrawer: LavirintDrawer;
    private lavirintConfigurator: LavirintConfigurator;
    private level: Level;
    private player: Player;
    
    public root: HTMLDivElement;

    constructor() {
        this.lavirintDrawer = new LavirintDrawer(this);
        this.lavirintConfigurator = new LavirintConfigurator();
        this.level = new Level();
        this.player = new Player();
        scoreInstance.lav = this;
    }

    public draw(parent: HTMLElement): HTMLElement {
        this.root = Draw.div(parent, "div-lavirint");
        this.lavirintConfigurator.draw(this.root);

        this.lavMat$ = this.lavirintConfigurator.level$
        .pipe(
            map(l => +l),
            switchMap(l => this.level.getLevel(l)),
            shareReplay()
        );

        this.lavirintDrawer.draw(this.root);

        this.player.sub2Colors(this.playerColor$);

        this.sub2Positions();

        return this.root;
    }

    private sub2Positions(): void {
        this.lavMat$
        .pipe(
            switchMap((lavMat) => {
                return startKeyPresse$()
                .pipe(
                    scan((pos: Position, dir: Direction) => {
                        let checkPos: Position = pos.check(dir);
                        let movePos: Position = pos.move(dir);
                        if(lavMat.getEl(movePos) === undefined || 
                            lavMat.getEl(checkPos) instanceof Wall) {
                            if(movePos.equal(lavMat.endPos)) {
                                this.nextLevel();
                                return movePos;
                            }
                            return pos;
                        }
                        return movePos;
                    }, lavMat.startPos),
                );
            }),
            pairwise(),
            withLatestFrom(this.lavMat$),
            map(positonsWithMat => ({
                prevPos: positonsWithMat[0][0],
                currPos: positonsWithMat[0][1],
                lavMat: positonsWithMat[1],
            })),
        )
        .subscribe(positonsWithMat => {
            positonsWithMat.lavMat.getEl(positonsWithMat.prevPos).thisDiv.innerHTML = "";
            this.player.draw(positonsWithMat.lavMat.getEl(positonsWithMat.currPos).thisDiv);
        });
    }

    get lavirintSize$(): Observable<string> {
        return this.lavirintConfigurator.lavirintSize$;
    }

    get wallColor$(): Observable<string> {
        return this.lavirintConfigurator.wallColor$;
    }

    get wallWidth$(): Observable<string> {
        return this.lavirintConfigurator.wallWidth$;
    }

    get backColor$(): Observable<string> {
        return this.lavirintConfigurator.backColor$;
    }

    get level$(): Observable<string> {
        return this.lavirintConfigurator.level$;
    }

    get playerColor$(): Observable<string> {
        return this.lavirintConfigurator.playerColor$;
    }

    private nextLevel(): void {
        const inLvl = <HTMLInputElement>document.querySelector(".input-level");                                    
        inLvl.value = (+inLvl.value + 1).toString();
        inLvl.dispatchEvent(new Event("change"));
        
        scoreInstance.increase(ScoreValues.nextLevel);
    }

    resetGame(): void {
        const inLvl = <HTMLInputElement>document.querySelector(".input-level");                                    
        inLvl.value = (0).toString();
        inLvl.dispatchEvent(new Event("change"));
    }
}

const DirectionKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

function startKeyPresse$(): Observable<Direction> {
    return merge(
        from(["ArrowDown", "ArrowUp"]), 
        fromEvent(document, 'keyup')
        .pipe(
            map((event: KeyboardEvent) => event.key),
            filter(key => DirectionKeys.includes(key)),
        ),
    )
    .pipe(
        map(key => key2Direction(key)),
    );
}

function key2Direction(key: string): Direction {
    let dir: Direction;
    switch(key) {
        case 'ArrowUp':
            dir = "up";
            break;
        case 'ArrowDown':
            dir = "down";
            break;
        case 'ArrowLeft':
            dir = "left";
            break;
        case 'ArrowRight':
            dir = "right";
            break;
    }
    return dir;
}