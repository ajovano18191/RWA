export type Direction = 'up' | 'down' | 'left' | 'right';

export class Position {

    constructor(private x: number, private y: number) {

    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }

    check(direction: Direction): Position {
        switch(direction) {
            case 'up':
                return new Position(this.X - 1, this.Y);
            case 'down':
                return new Position(this.X + 1, this.Y);
            case 'left':
                return new Position(this.X, this.Y - 1);
            case 'right':
                return new Position(this.X, this.Y + 1);
        }
    }

    move(direction: Direction): Position {
        switch(direction) {
            case 'up':
                return new Position(this.X - 2, this.Y);
            case 'down':
                return new Position(this.X + 2, this.Y);
            case 'left':
                return new Position(this.X, this.Y - 2);
            case 'right':
                return new Position(this.X, this.Y + 2);
        }
    }

    moveUp(): number {
        return this.x -= 2;
    }

    moveDown(): number {
        return this.x += 2;
    }

    moveLeft(): number {
        return this.y -= 2;
    }

    moveRight(): number {
        return this.y += 2;
    }
}