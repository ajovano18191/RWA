import { Observable, concatMap, from } from "rxjs";
import { LavirintItem } from "../LavirintItems/LavirintItem";
import { Position } from "../Position";

export interface IPosition {
    X: number;
    Y: number;
}

export class LavirintMatrix {
    private mat: Array<Array<LavirintItem>>;
    public startPos: Position;
    public endPos: Position;

    constructor(startPos: IPosition, endPos: IPosition) {
        this.startPos = new Position(startPos.X, startPos.Y);
        this.endPos = new Position(endPos.X, endPos.Y);
        this.mat = new Array<Array<LavirintItem>>();
    }

    getEl(pos: Position): LavirintItem | undefined;
    getEl(i: number, j: number): LavirintItem | undefined;
    getEl(i: number | Position, j?: number): LavirintItem | undefined {
        let x: number;
        let y: number;
        if (typeof i === 'object') {
            x = i.X;
            y = i.Y;
        } 
        else {
            x = i;
            y = j;
        }
        if(this.mat[x] !== undefined) {
            return this.mat[x][y];
        }
        return undefined;
    }      

    setEl(it: LavirintItem, pos: Position): void;
    setEl(it: LavirintItem, i: number, j: number): void;
    setEl(it: LavirintItem, x: number | Position, j?: number): void {
        if (typeof x === 'object') {
            this.mat[x.X][x.Y] = it;
        } 
        else {
            this.mat[x][j] = it;
        }
    }

    getArr(pos: Position): LavirintItem[] | undefined;
    getArr(i: number): LavirintItem[] | undefined;
    getArr(i: Position | number): LavirintItem[] | undefined {
        if (typeof i === 'object') {
            return this.mat[i.X];
        } 
        else {
            return this.mat[i];
        }
    }

    pushNewArr(): LavirintItem[] {
        let arr = new Array<LavirintItem>();
        this.mat.push(arr);
        return arr;
    }

    get length(): number {
        return this.mat.length;
    }

    public numOfItems(): number {
        return this.mat.reduce((acc, curr) => acc + curr.length, 0);
    }

    get matrix(): Array<Array<LavirintItem>> {
        return this.mat;
    }

    get item$(): Observable<LavirintItem> {
        return from(this.mat)
        .pipe(
            concatMap(row => row)
        );
    }
}