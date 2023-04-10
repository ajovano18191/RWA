import { tap, from, Observable, share, switchMap, map, mergeMap, count, last } from "rxjs";
import { Draw } from "../Draw";
import { LavirintItem } from "../LavirintItems/LavirintItem";
import { Level } from "../Level";
import { IDrawable } from "../IDrawable";
import { LavirintDrawer } from "./LavirintDrawer";
import { LavirintConfigurator } from "./LavirintConfigurator";

export class Lavirint implements IDrawable {

    public lavMatItem$: Observable<LavirintItem[][]> = new Observable<LavirintItem[][]>();

    private lavirintDrawer: LavirintDrawer;
    private lavirintConfigurator: LavirintConfigurator;
    private level: Level;

    public lavMat: Array<Array<LavirintItem>> = new Array<Array<LavirintItem>>();
    
    public root: HTMLDivElement;

    constructor() {
        this.lavirintDrawer = new LavirintDrawer(this);
        this.lavirintConfigurator = new LavirintConfigurator(this);
        this.level = new Level();


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
            })
        );

        console.log(this.lavMatItem$);

        this.lavMatItem$.subscribe(p => {
            console.log(p);
            this.lavMat = p
        });

        this.lavirintDrawer.draw(this.root);

        return this.root;
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