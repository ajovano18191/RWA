import { count, combineLatest, first, tap, mergeMap, map, reduce, from, last, bufferCount, share } from "rxjs";
import { IDrawable } from "../IDrawable";
import { Lavirint } from "./Lavirint";
import { Draw } from "../Draw";
import { LavirintConfigurator } from "./LavirintConfigurator";
import { Wall } from "../LavirintItems/Wall";

export class LavirintDrawer implements IDrawable {

    private backColor: string = "#ff0000";
    private frontColor: string = "#ffffff";

    constructor(private lavirint: Lavirint) {

    }

    draw(parent: HTMLElement): HTMLElement {
        const gridCont: HTMLDivElement = Draw.div(parent, "grid-container");

        this.lavirint.lavirintWidth$.subscribe(p => gridCont.style.width = p);
        this.lavirint.lavirintHeight$.subscribe(p => gridCont.style.height = p);
        
        this.lavirint.lavMatItem$
        .pipe(
            tap(() => {
                gridCont.innerHTML = "";
            }),
            mergeMap(mat => mat),
            mergeMap(mat => mat)
        )
        .subscribe(gIt => {
            let x = gIt.draw(gridCont);
            if(gIt instanceof Wall) {
                x.style.backgroundColor = this.frontColor;
            }
            else {
                x.style.backgroundColor = this.backColor;
            }
        });

        let lavMatCount$ = this.lavirint.lavMatItem$.pipe(
            mergeMap(matrix => 
                from(matrix)
                .pipe(
                    map(row => row.length),
                    reduce((acc, curr) => acc + curr, 0),
                )
            ),
            share()
        );

        combineLatest([lavMatCount$, this.lavirint.wallWidth$])
        .subscribe(([lavItems, wallWidth]) => {
            wallWidth += "%";
            gridCont.style.gridTemplateRows = 
                this.createGridTemplate((this.lavirint.lavMat.length - 1) / 2, wallWidth);

            let numOfCols: number = Math.floor(lavItems / this.lavirint.lavMat.length);
            numOfCols = Math.floor((numOfCols - 1) / 2);

            gridCont.style.gridTemplateColumns = 
                this.createGridTemplate(numOfCols, wallWidth);
        });


        this.lavirint.wallColor$
        .subscribe(wallColor => {
            this.frontColor = wallColor;
            gridCont
            .querySelectorAll(".div-wall")
            .forEach(wall => 
                (<HTMLDivElement>wall).style.backgroundColor = wallColor
            );
        });

        this.lavirint.backColor$
        .subscribe(backColor => {
            this.backColor = backColor;
            gridCont
            .querySelectorAll(".div-field, .div-no-wall")
            .forEach(back => 
                (<HTMLDivElement>back).style.backgroundColor = backColor
            );
        });

        return gridCont;
    }

    private createGridTemplate(numsOfFields: number, wallSize: string): string {
        return `${wallSize} auto `.repeat(numsOfFields).concat(`${wallSize}`);
    }
}