import { Draw } from "../Draw";
import { IDrawable } from "../IDrawable";

export abstract class LavirintItem implements IDrawable {
    public thisDiv: HTMLDivElement;
    
    constructor() {
        
    }

    abstract draw(par: HTMLElement): HTMLDivElement;

    protected setColor(color: string): void {
        this.thisDiv.style.backgroundColor = color;
    }

    public abstract chooseAndSetColor(foreColor: string, backColor: string): void;
}