import { Draw } from "../Draw";
import { LavirintItem } from "./LavirintItem";

export class NoWall extends LavirintItem {

    constructor() {
        super();
    }

    public draw(par: HTMLElement): HTMLDivElement {
        this.thisDiv = Draw.div(par, "div-no-wall");
        return this.thisDiv;
    }

    public chooseAndSetColor(foreColor: string, backColor: string): void {
        this.setColor(backColor);
    }
}