import { Observable, switchMap, map, tap } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
import { Field } from "./LavirintItems/Field";
import { LavirintItem } from "./LavirintItems/LavirintItem";
import { NoWall } from "./LavirintItems/NoWall";
import { Wall } from "./LavirintItems/Wall";
import { IPosition, LavirintMatrix } from "./Lavirint/LavirintMatrix";

interface ILevel {
    Wall: number;
    NoWall: number;
    Field: number;
    LevelMat: number[][];
    StartPos: IPosition;
    EndPos: IPosition;
}

export class Level {

    private Wall: number;
    private NoWall: number;
    private Field: number;

    constructor() {

    }

    public getLevel(lvl: number): Observable<LavirintMatrix> {
        return fetchLevel(lvl)
        .pipe(
            tap((lav) => {
                this.Wall = lav.Wall !== undefined ? lav.Wall : this.Wall;
                this.NoWall = lav.NoWall !== undefined ? lav.NoWall : this.NoWall;
                this.Field = lav.Field !== undefined ? lav.Field : this.Field;
            }),
            map(lav => {
                let lavirintMat = new LavirintMatrix(lav.StartPos, lav.EndPos);
                lav.LevelMat.forEach(row => {
                    let arr = lavirintMat.pushNewArr();
                    row.forEach(num => {
                        let it = this.num2LavirintItem(num);
                        arr.push(it);
                    })
                });
                return lavirintMat;
            }),
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

const baseURL: string = "http://localhost:3000/lavirint";

function fetchLevel(lvlID: number): Observable<ILevel> {
    return fromFetch(baseURL + "/" + lvlID)
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