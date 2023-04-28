import { combineLatest, tap, mergeMap, map, reduce, from, concatMap, withLatestFrom, Observable } from "rxjs";
import { IDrawable } from "../IDrawable";
import { Lavirint } from "./Lavirint";
import { Draw } from "../Draw";
import { ColorPair } from "../ColorPair";

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
                backColor: backColor
            }))
        );
        this.sub2ColorPairs(colorPair$);
        this.drawItems(colorPair$);

        return this.gridCont;
    }

    private sub2Width(): void {
        this.lavirint.lavirintWidth$.subscribe(p => this.gridCont.style.width = p);
    }

    private sub2Height(): void {
        this.lavirint.lavirintHeight$.subscribe(p => this.gridCont.style.height = p);
    }

    private updateGridTemplate(): void {
        let lavMatCount$ = this.lavirint.lavMatItem$.pipe(
            mergeMap(matrix => 
                from(matrix)
                .pipe(
                    map(row => row.length),
                    reduce((acc, curr) => acc + curr, 0),
                )
            ),
        );

        combineLatest([lavMatCount$, this.lavirint.wallWidth$])
        .subscribe(([lavItems, wallWidth]) => {
            wallWidth += "%";

            this.gridCont.style.gridTemplateRows = 
                this.createGridTemplate((this.lavirint.lavMat.length - 1) / 2, wallWidth);

            let numOfCols: number = Math.floor(lavItems / this.lavirint.lavMat.length);
            numOfCols = Math.floor((numOfCols - 1) / 2);

            this.gridCont.style.gridTemplateColumns = 
                this.createGridTemplate(numOfCols, wallWidth);
        });

    }

    private createGridTemplate(numsOfFields: number, wallSize: string): string {
        return `${wallSize} auto `.repeat(numsOfFields).concat(`${wallSize}`);
    }

    private drawItems(colorPair$: Observable<ColorPair>): void {
        this.lavirint.lavMatItem$
        .pipe(
            tap(() => {
                this.gridCont.innerHTML = "";
            }),
            concatMap(mat => mat),
            concatMap(mat => mat),
            withLatestFrom(colorPair$),
            map(p => ({
                it: p[0],
                cp: p[1],
            }))
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
        color$.subscribe(cp => {
            this.lavirint.lavMat
            .forEach(row => 
                row.forEach(it => 
                    it.chooseAndSetColor(cp)
                )
            );
        });
    }
}