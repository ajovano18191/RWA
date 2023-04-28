import { Draw } from "./Draw";
import { IDrawable } from "./IDrawable";
import { Position } from "./Position";

export class Player implements IDrawable {
    
    private position: Position;

    constructor(x: number, y: number) {
        this.position = new Position(x, y);
    }

    public draw(parent: HTMLElement): HTMLElement {
        return Draw.div(parent, "div-player");
    }

}