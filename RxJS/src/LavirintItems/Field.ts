import { Draw } from "../Draw";
import { LavirintItem } from "./LavirintItem";

export class Field extends LavirintItem {
    constructor() {
        super();
    }

    public draw(par: HTMLElement): HTMLDivElement {
        return Draw.div(par, "div-field");
    }
}