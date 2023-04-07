import { count, combineLatest } from "rxjs";
import { IDrawable } from "../IDrawable";
import { Lavirint } from "./Lavirint";
import { Draw } from "../Draw";
import { LavirintConfigurator } from "./LavirintConfigurator";

export class LavirintDrawer implements IDrawable {
    
    private lavirintConfigurator: LavirintConfigurator;

    constructor(private lavirint: Lavirint) {
        this.lavirintConfigurator = new LavirintConfigurator(lavirint.root);
    }

    draw(parent: HTMLElement): HTMLElement {
        const gridCont: HTMLDivElement = Draw.div(parent, "grid-container");

        this.lavirintConfigurator.lavirintWidth$.subscribe(p => gridCont.style.width = p);
        this.lavirintConfigurator.lavirintHeight$.subscribe(p => gridCont.style.height = p);
        
        this.lavirint.lavItem$.subscribe(lvlItem => lvlItem.draw(gridCont));

        combineLatest([this.lavirint.lavItem$.pipe(count()), this.lavirintConfigurator.wallWidth$])
        .subscribe(([lavItems, wallWidth]) => {
            wallWidth += "%";
            gridCont.style.gridTemplateRows = this.createGridTemplate((this.lavirint.lavMat.length - 1) / 2, wallWidth);

            let numOfCols: number = Math.floor(lavItems / this.lavirint.lavMat.length);
            numOfCols = Math.floor((numOfCols - 1) / 2);

            gridCont.style.gridTemplateColumns =  this.createGridTemplate(numOfCols, wallWidth);

        });

        this.lavirintConfigurator.wallColor$
        .subscribe(wallColor => 
            gridCont
            .querySelectorAll(".div-wall")
            .forEach(wall => 
                (<HTMLDivElement>wall).style.backgroundColor = wallColor
            )
        );

        this.lavirintConfigurator.backColor$
        .subscribe(backColor => 
            gridCont
            .querySelectorAll(".div-field, .div-no-wall")
            .forEach(back => 
                (<HTMLDivElement>back).style.backgroundColor = backColor
            )
        );

        //this.lavirintConfigurator.level$
        //.subscribe(lvl => {
        //    gridCont.innerHTML = "";
        //    this.lavirint.setLevel(+lvl)
        //});

        return gridCont;
    }

    private createGridTemplate(numsOfFields: number, wallSize: string): string {
        return `${wallSize} auto `.repeat(numsOfFields).concat(`${wallSize}`);
    }
}