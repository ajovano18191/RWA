import { Observable, switchMap, map, shareReplay, last, fromEvent, filter, pairwise, startWith, scan, concat, of, merge, from, tap, take, withLatestFrom } from "rxjs";
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

        this.lavMatItem$
        .subscribe(p => {
            //this.player.draw(p[1][1].thisDiv);
        });

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
                        if(lavMat[checkPos.X][checkPos.Y] instanceof Wall) {
                            return pos;
                        }
                        return pos.move(dir);
                    }, new Position(1, 1)),
                );
            }),
            pairwise(),
            withLatestFrom(this.lavMatItem$),
            map(p => ({
                prevPos: p[0][0],
                currPos: p[0][1],
                lavMat: p[1],
            })),
        )
        .subscribe(p => {
            p.lavMat[p.prevPos.X][p.prevPos.Y].thisDiv.innerHTML = "";
            this.player.draw(this.lavMat[p.currPos.X][p.currPos.Y].thisDiv);
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