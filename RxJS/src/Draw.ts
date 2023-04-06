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
        const divEl = this.element("div", parent, cssClasses);
        return Object.assign(divEl, { align: "center" });
    }
}