import { tap, from, Observable, share, switchMap, map, mergeMap, count, last } from "rxjs";
import { Draw } from "../Draw";
import { LavirintItem } from "../LavirintItems/LavirintItem";
import { Level } from "../Level";
import { IDrawable } from "../IDrawable";
import { LavirintDrawer } from "./LavirintDrawer";
import { LavirintConfigurator } from "./LavirintConfigurator";

export class Lavirint implements IDrawable {

    public lavItem$: Observable<LavirintItem>;

    private lavirintDrawer: LavirintDrawer;


    public lavMat: Array<Array<LavirintItem>> = new Array<Array<LavirintItem>>();
    private level: Level;
    public root: HTMLDivElement;

    constructor(parent: HTMLElement) {
        this.root = Draw.div(parent, "div-lavirint");

        this.lavirintDrawer = new LavirintDrawer(this);
        this.setLevel(0);
        this.draw(this.root);
    }

    public setLevel(levelID: number): void {
        this.level = new Level();
        this.lavMat = new Array<Array<LavirintItem>>();

        this.lavItem$ = this.level.getLevel(levelID, this.lavMat);
        
    }

    public draw(parent: HTMLElement): HTMLElement {
        return this.lavirintDrawer.draw(parent);
    }


}