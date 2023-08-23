import { concat, fromEvent, map, Observable, of, startWith } from "rxjs";
import { Draw } from "../Draw";
import { IDrawable } from "../IDrawable";
import { Lavirint } from "./Lavirint";

export class LavirintConfigurator implements IDrawable {

    private root: HTMLDivElement;

    private _lavirintSize$: Observable<string>;
    private _wallColor$: Observable<string>;
    private _wallWidth$: Observable<string>;
    private _backColor$: Observable<string>;
    private _level$: Observable<string> = new Observable<string>();
    private _playerColor$: Observable<string>;

    constructor(private lavirint: Lavirint) {
        
    }

    public draw(parent: HTMLElement): HTMLElement {
        this.root = Draw.div(parent, "div-lavirint-config");
        
        this.drawLavirintSize();
        this.drawWallColor();
        this.drawWallWidth();
        this.drawBackColor();
        this.drawLevel();
        this.drawPlayerColor();

        return this.root;
    }

    get lavirintSize$(): Observable<string> {
        return this._lavirintSize$;
    }

    get wallColor$(): Observable<string> {
        return this._wallColor$;
    }

    get wallWidth$(): Observable<string> {
        return this._wallWidth$;
    }

    get backColor$(): Observable<string> {
        return this._backColor$;
    }

    get level$(): Observable<string> {
        return this._level$;
    }

    get playerColor$(): Observable<string> {
        return this._playerColor$;
    }

    private drawLavirintSize() {
        const lavirintSizeLabel = Draw.label(this.root, "Velicina prozora: ", "lbl-lavirint-size");
        const lavirintSizePicker = Draw.input(this.root, "number", "input-lavirint-size");

        const defaultLavirintSize: string = "90";

        this._lavirintSize$ = fromEvent(lavirintSizePicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
            startWith(defaultLavirintSize),
        );

        lavirintSizePicker.value = defaultLavirintSize;
    }

    private drawWallColor() {
        const wallColorLabel = Draw.label(this.root, "Boja zida: ", "lbl-wall-color");
        const wallColorPicker = Draw.input(this.root, "color", "input-wall-color");

        const defaultWallColor: string = "#ff0000";

        this._wallColor$ = fromEvent(wallColorPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
            startWith(defaultWallColor),
        );

        wallColorPicker.value = defaultWallColor;
    }

    private drawWallWidth() {
        const wallWidthLabel = Draw.label(this.root, "Sirina zida: ", "lbl-wall-width");
        const wallWidthPicker = Draw.input(this.root, "number", "input-wall-width");

        const defaultWallWidth: string = "2";

        wallWidthPicker.setAttribute("min", "0.5");
        wallWidthPicker.setAttribute("step", "0.5");

        this._wallWidth$ = fromEvent(wallWidthPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
            startWith(defaultWallWidth),
        );

        wallWidthPicker.value = defaultWallWidth;
    }

    private drawBackColor() {
        const backColorLabel = Draw.label(this.root, "Boja pozadine: ", "lbl-back-color");
        const backColorPicker = Draw.input(this.root, "color", "input-back-picker");

        const defaultBackColor: string = "#ffffff";

        this._backColor$ = fromEvent(backColorPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
            startWith(defaultBackColor),
        );

        backColorPicker.value = defaultBackColor;
    }

    private drawLevel() {
        const levelLabel = Draw.label(this.root, "Level: ", "lbl-level");
        const levelPicker = Draw.input(this.root, "number", "input-level-picker");

        levelPicker.setAttribute("min", "0");
        levelPicker.setAttribute("max", "1");

        const defaultLevel = "0";

        this._level$ = fromEvent(levelPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
            startWith(defaultLevel),
        );

        levelPicker.value = defaultLevel;
    }

    private drawPlayerColor() {
        const playerColorLabel = Draw.label(this.root, "Boja igraca: ", "lbl-player-color");
        const playerColorPicker = Draw.input(this.root, "color", "input-player-picker");

        const defaultPlayerColor: string = "#0000ff";

        this._playerColor$ = fromEvent(playerColorPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
            startWith(defaultPlayerColor),
        );

        playerColorPicker.value = defaultPlayerColor;
    }
}