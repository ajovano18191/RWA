import { tap, from, Observable, share, switchMap, map, mergeMap } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
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

export class Level {
    private readonly baseURL: string = "http://localhost:3000/lavirint";

    private Wall: number;
    private NoWall: number;
    private Field: number;

    constructor() {

    }

    private fetchLevel(lvlID: number): Observable<ILevel> {
        return fromFetch(this.baseURL + "/" + lvlID)
        .pipe(
            switchMap(response => {
                if(response.ok) {
                    return response.json();
                }
                else {
                    throw Error("Failed to fetch level");
                }
            })
        );
    }

    public getLevel(lvl: number, lavirintMat: Array<Array<LavirintItem>>): Observable<LavirintItem[][]> {
        return this.fetchLevel(lvl)
        .pipe(
            map(lav => {
                this.Wall = lav.Wall;
                this.NoWall = lav.NoWall;
                this.Field = lav.Field;

                return lav.LevelMat.map(row => 
                    row.map(num => 
                        this.num2LavirintItem(num)
                    )
                );
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