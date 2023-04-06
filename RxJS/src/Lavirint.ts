import { tap, from, Observable, share, switchMap, map, mergeMap, count, last } from "rxjs";
import { Draw } from "./Draw";
import { Field } from "./LavirintItems/Field";
import { LavirintItem } from "./LavirintItems/LavirintItem";
import { NoWall } from "./LavirintItems/NoWall";
import { Wall } from "./LavirintItems/Wall";
import { Level } from "./Level";

export class Lavirint {
    private lavMat: Array<Array<LavirintItem>> = new Array<Array<LavirintItem>>();
    private level: Level;

    constructor() {
        
    }

    public setLevel(levelID: number): Observable<LavirintItem> {
        this.level = new Level();
        this.lavMat = new Array<Array<LavirintItem>>();
        return this.level.getLevel(levelID, this.lavMat);
    }

    public draw(parent: HTMLElement, levelItem$: Observable<LavirintItem>) {
        const gridCont: HTMLDivElement = Draw.div(document.body, "grid-container");
        
        levelItem$.subscribe(lvlItem => lvlItem.draw(gridCont));

        levelItem$.pipe(last()).subscribe(() => 
            gridCont.style.gridTemplateRows = this.createGridTemplate((this.lavMat.length - 1) / 2, "2%", "auto")
        );

        levelItem$.pipe(count()).subscribe(colCount => {
            let numOfFields: number = Math.floor(colCount / this.lavMat.length);
            numOfFields = Math.floor((numOfFields - 1) / 2);
            gridCont.style.gridTemplateColumns = this.createGridTemplate(numOfFields, "2%", "auto");
        });

        return gridCont;
    }

    private createGridTemplate(numsOfFields: number, wallSize: string, fieldSize: string): string {
        return `${wallSize} ${fieldSize} `.repeat(numsOfFields).concat(`${wallSize}`);
    }
}