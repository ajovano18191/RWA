import { concat, fromEvent, map, Observable, of } from "rxjs";
import { Draw } from "../Draw";
import { IDrawable } from "../IDrawable";

export class LavirintConfigurator implements IDrawable {

    private root: HTMLDivElement;

    private _lavirintWidth$: Observable<string>;
    private _lavirintHeight$: Observable<string>;
    private _wallColor$: Observable<string>;
    private _wallWidth$: Observable<string>;
    private _backColor$: Observable<string>;
    private _level$: Observable<string>;

    constructor(private parent: HTMLElement) {
        this.draw(parent);
    }

    public draw(parent: HTMLElement): HTMLElement {
        this.root = Draw.div(parent, "div-lavirint-config");
        
        this.drawLavirintWidth();
        this.drawLavirintHeight();
        this.drawWallColor();
        this.drawWallWidth();
        this.drawBackColor();
        this.drawLevel();

        return this.root;
    }

    get lavirintWidth$(): Observable<string> {
        return this._lavirintWidth$;
    }

    get lavirintHeight$(): Observable<string> {
        return this._lavirintHeight$;
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

    private drawLavirintWidth() {
        const lavirintWidthLabel = Draw.label(this.root, "Sirina prozora: ", "lbl-lavirint-width");
        const lavirintWidthPicker = Draw.input(this.root, "number", "input-lavirint-width");

        const defaultLavirintWidth: string = "90";

        this._lavirintWidth$ = concat(
            of(defaultLavirintWidth), 
            fromEvent(lavirintWidthPicker, "change").pipe(
                map(
                    (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
                ),
            )
        );
    }

    private drawLavirintHeight() {
        const lavirintHeightLabel = Draw.label(this.root, "Visina prozora: ", "lbl-lavirint-height");
        const lavirintHeightPicker = Draw.input(this.root, "number", "input-lavirint-height");

        const defaultLavirintHeight: string = "90";

        this._lavirintHeight$ = concat(
            of(defaultLavirintHeight),
            fromEvent(lavirintHeightPicker, "change").pipe(
                map(
                    (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
                ),
            )
        );  
    }

    private drawWallColor() {
        const wallColorLabel = Draw.label(this.root, "Boja zida: ", "lbl-wall-color");
        const wallColorPicker = Draw.input(this.root, "color", "input-wall-color");

        const defaultWallColor: string = "#ff0000";

        this._wallColor$ = concat(
            of(defaultWallColor),
            fromEvent(wallColorPicker, "change").pipe(
                map(
                    (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
                ),
            )
        );

        wallColorPicker.value = defaultWallColor;
    }

    private drawWallWidth() {
        const wallWidthLabel = Draw.label(this.root, "Sirina zida: ", "lbl-wall-width");
        const wallWidthPicker = Draw.input(this.root, "number", "input-wall-width");

        const defaultWallWidth: string = "2";

        wallWidthPicker.setAttribute("min", "0.5");
        wallWidthPicker.setAttribute("step", "0.5");

        this._wallWidth$ = concat(
            of(defaultWallWidth), 
            fromEvent(wallWidthPicker, "change").pipe(
                map(
                    (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
                ),
            )
        );
        wallWidthPicker.value = defaultWallWidth;
    }

    private drawBackColor() {
        const backColorLabel = Draw.label(this.root, "Boja pozadine: ", "lbl-back-color");
        const backColorPicker = Draw.input(this.root, "color", "input-back-picker");

        const defaultBackColor: string = "#ffffff";

        this._backColor$ = concat(
            of(defaultBackColor),
            fromEvent(backColorPicker, "change").pipe(
                map(
                    (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
                ),
            ) 
        );

        backColorPicker.value = defaultBackColor;
    }

    private drawLevel() {
        const levelLabel = Draw.label(this.root, "Level: ", "lbl-level");
        const levelPicker = Draw.input(this.root, "number", "input-level-picker");
        this._level$ = fromEvent(levelPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
        ); 
    }
}