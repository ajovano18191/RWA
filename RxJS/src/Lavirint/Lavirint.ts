import { Observable, switchMap, map, shareReplay, fromEvent, filter, pairwise, scan, merge, from, withLatestFrom } from "rxjs";
import { Draw } from "../Draw";
import { LavirintItem } from "../LavirintItems/LavirintItem";
import { Level } from "../Level";
import { IDrawable } from "../IDrawable";
import { LavirintDrawer } from "./LavirintDrawer";
import { LavirintConfigurator } from "./LavirintConfigurator";
import { Player } from "../Player";
import { Direction, Position } from "../Position";
import { Wall } from "../LavirintItems/Wall";

export class Lavirint implements IDrawable {

    public lavMatItem$: Observable<LavirintItem[][]> = new Observable<LavirintItem[][]>();

    private lavirintDrawer: LavirintDrawer;
    private lavirintConfigurator: LavirintConfigurator;
    private level: Level;
    private player: Player;
    private playerPosition: Position;

    public lavMat: Array<Array<LavirintItem>> = new Array<Array<LavirintItem>>();
    
    public root: HTMLDivElement;

    constructor() {
        this.lavirintDrawer = new LavirintDrawer(this);
        this.lavirintConfigurator = new LavirintConfigurator(this);
        this.level = new Level();
        this.player = new Player();
        this.playerPosition = new Position(1, 1);
    }

    public draw(parent: HTMLElement): HTMLElement {
        this.root = Draw.div(parent, "div-lavirint");
        this.lavirintConfigurator.draw(this.root);

        this.lavMatItem$ = this.lavirintConfigurator.level$
        .pipe(
            map(l => +l),
            switchMap(l => {
                this.lavMat = new Array<Array<LavirintItem>>();
                return this.level.getLevel(l, this.lavMat)
            }),
            shareReplay()
        );

        this.lavirintDrawer.draw(this.root);

        this.sub2Positions();

        return this.root;
    }

    private sub2Positions(): void {
        this.lavMatItem$
        .pipe(
            switchMap((lavMat) => {
                return merge(
                    from(["ArrowDown", "ArrowUp"]), 
                    fromEvent(document, 'keyup')
                    .pipe(
                        map((event: KeyboardEvent) => event.key),
                        filter((key) => 
                            key === 'ArrowUp' || key === 'ArrowDown'
                            || key === 'ArrowLeft' || key === 'ArrowRight'
                        )
                    )
                )
                .pipe(
                    map(key => {
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
                    }),
                    scan((pos: Position, dir: Direction) => {
                        let checkPos: Position = pos.check(dir);
                        let movePos: Position = pos.move(dir);
                        if(lavMat[movePos.X] === undefined || 
                            lavMat[movePos.X][movePos.Y] === undefined || 
                            lavMat[checkPos.X][checkPos.Y] instanceof Wall) {
                                if(movePos.X === 5 && movePos.Y === 7) {
                                    let inLvl = <HTMLInputElement>document.querySelector(".input-level-picker");                                    
                                    inLvl.value = (+inLvl.value + 1).toString();
                                    inLvl.dispatchEvent(new Event("change"));
                                    return movePos;
                                }
                            return pos;
                        }
                        return movePos;
                    }, new Position(1, 1)),
                );
            }),
            pairwise(),
            withLatestFrom(this.lavMatItem$),
            map(positonsWithMat => ({
                prevPos: positonsWithMat[0][0],
                currPos: positonsWithMat[0][1],
                lavMat: positonsWithMat[1],
            })),
        )
        .subscribe(positonsWithMat => {
            positonsWithMat.lavMat[positonsWithMat.prevPos.X][positonsWithMat.prevPos.Y].thisDiv.innerHTML = "";
            this.player.draw(this.lavMat[positonsWithMat.currPos.X][positonsWithMat.currPos.Y].thisDiv);
        });
    }

    get lavirintWidth$(): Observable<string> {
        return this.lavirintConfigurator.lavirintWidth$;
    }

    get lavirintHeight$(): Observable<string> {
        return this.lavirintConfigurator.lavirintHeight$;
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
}