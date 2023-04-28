export class Position {

    constructor(private x: number, private y: number) {

    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }

    moveUp(): void {
        this.y += 2;
    }

    moveDown(): void {
        this.y -= 2;
    }

    moveLeft(): void {
        this.x -= 2;
    }

    moveRight(): void {
        this.x += 2;
    }
}