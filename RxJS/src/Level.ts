import { tap, from, Observable, share, switchMap, map, mergeMap } from "rxjs";
import { Field } from "./LavirintItems/Field";
import { LavirintItem } from "./LavirintItems/LavirintItem";
import { NoWall } from "./LavirintItems/NoWall";
import { Wall } from "./LavirintItems/Wall";

interface ILevel {
    Wall: number;
    NoWall: number;
    Field: number;
    LevelMat: number[][];
}

export class Level implements ILevel {
    private readonly baseURL: string = "http://localhost:3000/lavirint";

    public Wall: number;
    public NoWall: number;
    public Field: number;
    public LevelMat: number[][];  

    constructor() {

    }

    private fetchLevel(lvlID: number): Observable<ILevel> {
        return from(
            fetch(this.baseURL + "/" + lvlID)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error("Failed to fetch level");
                }
            })
            .catch((err) => console.log(err))
        );
    }

    private mat2Stream(lavirintMat: Array<Array<LavirintItem>>): Observable<LavirintItem> {        
        let arr = new Array<LavirintItem>();

        return from(this.LevelMat).pipe(
            tap(() => {
                arr = new Array<LavirintItem>();
                lavirintMat.push(arr);
            }),
            mergeMap(row => row),
            map(col => {
                let it = this.num2LavirintItem(col);
                arr.push(it);
                return it;
            }),
            share()
        ); 
    }

    public getLevel(lvl: number, lavirintMat: Array<Array<LavirintItem>>): Observable<LavirintItem> {
        return this.fetchLevel(lvl)
        .pipe(
            switchMap(lav => {                
                this.Wall = lav.Wall;
                this.NoWall = lav.NoWall;
                this.Field = lav.Field;
                this.LevelMat = lav.LevelMat;

                return this.mat2Stream(lavirintMat);
            }),
            share()
        );
    }

    private num2LavirintItem(num: number) {
        let it: LavirintItem = null;
        switch(num) {
            case this.Wall:
                it = new Wall();
                break;
            case this.NoWall:
                it = new NoWall();
                break;
            case this.Field:
                it = new Field();
                break;
        }
        return it;
    }
}