export class Draw {
    private static addCSSClasses(el: HTMLElement, cssClases?: string): void {
        if(cssClases) {
            cssClases.split(" ").forEach(p => 
                el.classList.add(p)
            );
        }
    }

    public static element(tagName: keyof HTMLElementTagNameMap, parent: HTMLElement, cssClases?: string): HTMLElement {
        const el: HTMLElement = document.createElement(tagName);
        this.addCSSClasses(el, cssClases);
        parent.appendChild(el);
        return el;
    }

    public static div(parent: HTMLElement, cssClasses?: string): HTMLDivElement {
        const divEl = Draw.element("div", parent, cssClasses);
        return Object.assign(divEl, { align: "center" });
    }

    public static label(parent: HTMLElement, text: string, cssClasses?: string): HTMLElement {
        const lblEl = Draw.element("label", parent, cssClasses);
        lblEl.innerText = text;
        return lblEl;
    }

    public static input(parent: HTMLElement, type: string, cssClasses?: string): HTMLInputElement {
        const inEl = Draw.element("input", parent, cssClasses) as HTMLInputElement;
        inEl.type = type;
        return inEl;
    }
}