import { Observable } from "rxjs";
import { Draw } from "./Draw";
import { IDrawable } from "./IDrawable";

export class Player implements IDrawable {
    public thisDiv: HTMLElement;
    private color: string;

    constructor() {

    }

    public draw(parent: HTMLElement): HTMLElement {
        this.thisDiv = Draw.div(parent, "div-player");
        this.thisDiv.style.backgroundColor = this.color;
        return this.thisDiv;
    }

    public sub2Colors(color$: Observable<string>): void {
        color$.subscribe(c => {
            if(this.thisDiv !== undefined) {
                this.thisDiv.style.backgroundColor = c;
            }
            this.color = c;
        });
    }
}