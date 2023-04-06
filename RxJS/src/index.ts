import { Lavirint } from "./Lavirint";

const lav: Lavirint = new Lavirint();
let lavirintItem$ = lav.setLevel(1);
lav.draw(document.body, lavirintItem$);
