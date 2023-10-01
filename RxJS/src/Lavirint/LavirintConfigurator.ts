import { fromEvent, map, Observable, startWith } from "rxjs";
import { Draw } from "../Draw";
import { IDrawable } from "../IDrawable";

type ConfiguratorParams = {
    title: string;
    cssName: string;
    type: string;
    defaultValue: string;
}

export class LavirintConfigurator implements IDrawable {

    private root: HTMLDivElement;

    private _lavirintSize$: Observable<string>;
    private _wallColor$: Observable<string>;
    private _wallWidth$: Observable<string>;
    private _backColor$: Observable<string>;
    private _level$: Observable<string> = new Observable<string>();
    private _playerColor$: Observable<string>;

    constructor() { }

    public draw(parent: HTMLElement): HTMLElement {
        this.root = Draw.div(parent, "div-lavirint-config");
        
        this._lavirintSize$ = this.drawOneConfigurator({
            title: "Velicina lavirinta",
            cssName: "lavirint-size",
            type: "number",
            defaultValue: "90",
        });

        this._wallColor$ = this.drawOneConfigurator({
            title: "Boja zida",
            cssName: "wall-color",
            type: "color",
            defaultValue: "#ff0000",
        });

        this._wallWidth$ = this.drawOneConfigurator({
            title: "Sirina zida",
            cssName: "wall-width",
            type: "number",
            defaultValue: "2",
        });

        this._backColor$ = this.drawOneConfigurator({
            title: "Boja pozadine",
            cssName: "background-color",
            type: "color",
            defaultValue: "#ffffff",
        });

        this._level$ = this.drawOneConfigurator({
            title: "Level",
            cssName: "level",
            type: "number",
            defaultValue: "0",
        });

        this._playerColor$ = this.drawOneConfigurator({
            title: "Boja igraca",
            cssName: "player-color",
            type: "color",
            defaultValue: "#0000ff",
        });

        return this.root;
    }

    drawOneConfigurator(configuratorParams: ConfiguratorParams): Observable<string> {
        const label = Draw.label(this.root, `${configuratorParams.title}: `, `lbl-${configuratorParams.cssName}`);
        const picker = Draw.input(this.root, configuratorParams.type, `input-${configuratorParams.cssName}`);

        picker.value = configuratorParams.defaultValue;

        return fromEvent(picker, "change").pipe(
            map(
                (inputEvent: InputEvent) => (<HTMLInputElement>inputEvent.target).value
            ),
            startWith(configuratorParams.defaultValue),
        );
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
}