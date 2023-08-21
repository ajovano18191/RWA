import { combineLatest, tap, mergeMap, map, reduce, from, concatMap, withLatestFrom, Observable, switchMap, min, fromEvent, sampleTime } from "rxjs";
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

        this.sub2Size();
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

    private sub2Size(): void {
        combineLatest([
            this.lavirint.lavirintSize$
                .pipe(
                    map(p => +p)
                ),
            fromEvent(window, "resize")
                .pipe(
                    sampleTime(100)
                ),
        ])
        .pipe(
            map(p => p[0]),
            map(proc => {
                let lavSize = Math.min(window.innerWidth, window.innerHeight)
                lavSize = lavSize * proc / 100
                return lavSize
            })
        )
        .subscribe(lavSize => {
            this.gridCont.style.width = `${lavSize}px`
            this.gridCont.style.height = `${lavSize}px`
        })
    }

    private updateGridTemplate(): void {
        combineLatest([this.lavirint.lavMat$, this.lavirint.wallWidth$])
        .subscribe(([lavMat, wallWidth]) => {
            wallWidth = this.gridCont.offsetWidth * +wallWidth / 100 + "px";

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