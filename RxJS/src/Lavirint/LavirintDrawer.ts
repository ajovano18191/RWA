import { combineLatest, tap, mergeMap, map, reduce, from, concatMap, withLatestFrom, Observable, switchMap } from "rxjs";
import { IDrawable } from "../IDrawable";
import { Lavirint } from "./Lavirint";
import { Draw } from "../Draw";
import { ColorPair } from "../ColorPair";
import { LavirintItem } from "../LavirintItems/LavirintItem";

export class LavirintDrawer implements IDrawable {

    private gridCont: HTMLDivElement;

    constructor(private lavirint: Lavirint) {

    }

    draw(parent: HTMLElement): HTMLElement {
        this.gridCont = Draw.div(parent, "grid-container");

        this.sub2Width();
        this.sub2Height();
        this.updateGridTemplate();

        let colorPair$ = combineLatest([this.lavirint.wallColor$, this.lavirint.backColor$])
        .pipe(
            map(([wallColor, backColor]) => (<ColorPair>{
                foreColor: wallColor,
                backColor: backColor,
            })),
        );
        this.sub2ColorPairs(colorPair$);
        this.drawItems(colorPair$);

        return this.gridCont;
    }

    private sub2Width(): void {
        this.lavirint.lavirintWidth$.subscribe(p => this.gridCont.style.width = p + "vw");
    }

    private sub2Height(): void {
        this.lavirint.lavirintHeight$.subscribe(p => this.gridCont.style.height = p + "vh");
    }

    private updateGridTemplate(): void {
        combineLatest([this.lavirint.lavMat$, this.lavirint.wallWidth$])
        .subscribe(([lavMat, wallWidth]) => {
            wallWidth += "%";

            this.gridCont.style.gridTemplateRows = 
                this.createGridTemplate((lavMat.length - 1) / 2, wallWidth);

            let numOfCols: number = Math.floor(lavMat.numOfItems() / lavMat.length);
            numOfCols = Math.floor((numOfCols - 1) / 2);

            this.gridCont.style.gridTemplateColumns = 
                this.createGridTemplate(numOfCols, wallWidth);
        });
    }

    private createGridTemplate(numsOfFields: number, wallSize: string): string {
        return `${wallSize} auto `.repeat(numsOfFields).concat(`${wallSize}`);
    }

    private drawItems(colorPair$: Observable<ColorPair>): void {
        this.lavirint.lavMat$
        .pipe(
            tap(() => {
                this.gridCont.innerHTML = "";
            }),
            concatMap(lavMat => lavMat.item$),
            withLatestFrom(colorPair$),
            map(itWithCp => (<LIandCP>{
                it: itWithCp[0],
                cp: itWithCp[1],
            })),
        )
        .subscribe(itemWithColors => {
            itemWithColors.it.draw(this.gridCont);
            itemWithColors.it.chooseAndSetColor({
                foreColor: itemWithColors.cp.foreColor, 
                backColor: itemWithColors.cp.backColor,
            });
        });
    }

    private sub2ColorPairs(color$: Observable<ColorPair>): void {
        color$.pipe(
            withLatestFrom(this.lavirint.lavMat$),
            switchMap(cpAndLavMat => cpAndLavMat[1].item$
                .pipe(
                    map(it => (<LIandCP>{
                        it: it,
                        cp: cpAndLavMat[0]
                    }))
                )
            ),
        )
        .subscribe(p => p.it.chooseAndSetColor(p.cp));
    }
}

interface LIandCP {
    it: LavirintItem;
    cp: ColorPair;
}