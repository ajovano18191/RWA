import { Draw } from "./Draw";
import { IDrawable } from "./IDrawable";

export class Player implements IDrawable {
    public thisDiv: HTMLElement;
    constructor() {

    }

    public draw(parent: HTMLElement): HTMLElement {
        this.thisDiv = Draw.div(parent, "div-player");
        return this.thisDiv;
    }

}