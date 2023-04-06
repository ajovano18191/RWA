import { tap, from, Observable, share, switchMap, map, mergeMap, count, last } from "rxjs";
import { Draw } from "./Draw";
import { LavirintItem } from "./LavirintItems/LavirintItem";
import { Level } from "./Level";

export class Lavirint {

    private readonly rowWallW: string = "2%";
    private readonly rowFieldW: string = "auto";

    private readonly colWallH: string = "2%";
    private readonly colFieldH: string = "auto";

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
        const gridCont: HTMLDivElement = Draw.div(parent, "grid-container");
        
        levelItem$.subscribe(lvlItem => lvlItem.draw(gridCont));

        levelItem$.pipe(last()).subscribe(() => 
            gridCont.style.gridTemplateRows = 
            this.createGridTemplate((this.lavMat.length - 1) / 2, 
            this.rowWallW, this.rowFieldW)
        );

        levelItem$.pipe(count()).subscribe(colCount => {
            let numOfFields: number = Math.floor(colCount / this.lavMat.length);
            numOfFields = Math.floor((numOfFields - 1) / 2);
            gridCont.style.gridTemplateColumns = 
            this.createGridTemplate(numOfFields, this.colWallH, this.colFieldH);
        });

        return gridCont;
    }

    private createGridTemplate(numsOfFields: number, wallSize: string, fieldSize: string): string {
        return `${wallSize} ${fieldSize} `.repeat(numsOfFields).concat(`${wallSize}`);
    }
}