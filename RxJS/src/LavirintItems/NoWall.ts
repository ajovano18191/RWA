import { Draw } from "../Draw";
import { LavirintItem } from "./LavirintItem";

export class NoWall extends LavirintItem {
    constructor() {
        super();
    }

    public draw(par: HTMLElement): HTMLDivElement {
        return Draw.div(par, "div-no-wall");
    }
}