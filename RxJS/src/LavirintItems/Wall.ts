import { Draw } from "../Draw";
import { LavirintItem } from "./LavirintItem";

export class Wall extends LavirintItem {

    constructor() {
        super();
    }

    public draw(par: HTMLElement): HTMLDivElement {
        this.thisDiv = Draw.div(par, "div-wall");
        return this.thisDiv;
    }

    public chooseAndSetColor(foreColor: string, backColor: string): void {
        this.setColor(foreColor);
    }
}