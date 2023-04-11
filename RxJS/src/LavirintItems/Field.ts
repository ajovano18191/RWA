import { Draw } from "../Draw";
import { LavirintItem } from "./LavirintItem";

export class Field extends LavirintItem {

    constructor() {
        super();
    }

    public draw(par: HTMLElement): HTMLDivElement {
        this.thisDiv = Draw.div(par, "div-field");
        return this.thisDiv;
    }

    public chooseAndSetColor(foreColor: string, backColor: string): void {
        this.setColor(backColor);
    }
}