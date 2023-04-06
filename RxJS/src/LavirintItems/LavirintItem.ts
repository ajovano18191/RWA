import { Draw } from "../Draw";

export abstract class LavirintItem {
    protected parent: HTMLElement;
    constructor() {

    }

    abstract draw(par: HTMLElement): HTMLDivElement;
}