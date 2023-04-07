import { Draw } from "../Draw";
import { IDrawable } from "../IDrawable";

export abstract class LavirintItem implements IDrawable {
    protected parent: HTMLElement;
    constructor() {

    }

    abstract draw(par: HTMLElement): HTMLDivElement;
}