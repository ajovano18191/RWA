import { fromEvent, map, Observable, of } from "rxjs";
import { Draw } from "../Draw";
import { IDrawable } from "../IDrawable";

export class LavirintConfigurator implements IDrawable {

    private root: HTMLDivElement;

    private _lavirintWidth$: Observable<string>;
    private _lavirintHeight$: Observable<string>;
    private _wallColor$: Observable<string>;
    private _wallWidth$: Observable<string> = of("2");
    private _backColor$: Observable<string>;
    private _level$: Observable<string>;

    constructor(private parent: HTMLElement) {
        this.draw(parent);
    }

    draw(parent: HTMLElement): HTMLElement {
        this.root = Draw.div(parent, "div-lavirint-config");
        
        const lavirintWidthLabel = Draw.label(this.root, "Sirina prozora: ", "lbl-lavirint-width");
        const lavirintWidthPicker = Draw.input(this.root, "number", "input-lavirint-width");
        this._lavirintWidth$ = fromEvent(lavirintWidthPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
        );
 
        const lavirintHeightLabel = Draw.label(this.root, "Visina prozora: ", "lbl-lavirint-height");
        const lavirintHeightPicker = Draw.input(this.root, "number", "input-lavirint-height");
        this._lavirintHeight$ = fromEvent(lavirintHeightPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
        );  
 
        const wallColorLabel = Draw.label(this.root, "Boja zida: ", "lbl-wall-color");
        const wallColorPicker = Draw.input(this.root, "color", "input-wall-color");
        this._wallColor$ = fromEvent(wallColorPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
        );  

        const wallWidthLabel = Draw.label(this.root, "Sirina zida: ", "lbl-wall-width");
        const wallWidthPicker = Draw.input(this.root, "number", "input-wall-width");
        this._wallWidth$ = fromEvent(wallWidthPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
        ); 
 
        const backColorLabel = Draw.label(this.root, "Boja pozadine: ", "lbl-back-color");
        const backColorPicker = Draw.input(this.root, "color", "input-back-picker");
        this._backColor$ = fromEvent(backColorPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
        ); 

        const levelLabel = Draw.label(this.root, "Level: ", "lbl-level");
        const levelPicker = Draw.input(this.root, "number", "input-level-picker");
        this._level$ = fromEvent(levelPicker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
        ); 
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
}