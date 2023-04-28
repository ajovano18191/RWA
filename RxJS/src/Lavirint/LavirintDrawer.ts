import { combineLatest, tap, mergeMap, map, reduce, from, concatMap, withLatestFrom, Observable } from "rxjs";
import { IDrawable } from "../IDrawable";
import { Lavirint } from "./Lavirint";
import { Draw } from "../Draw";

export class LavirintDrawer implements IDrawable {

    private gridCont: HTMLDivElement;

    constructor(private lavirint: Lavirint) {

    }

    draw(parent: HTMLElement): HTMLElement {
        this.gridCont = Draw.div(parent, "grid-container");

        let wallColor: string = "#ff0000";
        let backColor: string = "#ffffff";

        this.sub2Width();
        this.sub2Height();
        this.updateGridTemplate();

        let color$ = combineLatest([this.lavirint.wallColor$, this.lavirint.backColor$]);
        

        

        return this.gridCont;
    }

    private createGridTemplate(numsOfFields: number, wallSize: string): string {
        return `${wallSize} auto `.repeat(numsOfFields).concat(`${wallSize}`);
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

    private drawItems(color$: Observable<[string, string]>): void {
        this.lavirint.lavMatItem$
        .pipe(
            tap(() => {
                this.gridCont.innerHTML = "";
            }),
            concatMap(mat => mat),
            concatMap(mat => mat),
            withLatestFrom(color$),
            map(p => ({
                it: p[0],
                wallColor: p[1][0],
                backColor: p[1][1],
            }))
        )
        .subscribe(itemWithColors => {
            itemWithColors.it.draw(this.gridCont);
            itemWithColors.it.chooseAndSetColor(itemWithColors.wallColor, itemWithColors.backColor);
        });
    }

    private sub2Colors(color$: Observable<[string, string]>): void {
        color$.subscribe(([wallC, backC]) => {
            this.lavirint.lavMat
            .forEach(row => 
                row.forEach(it => 
                    it.chooseAndSetColor(wallC, backC)
                )
            );
        });
    }
}