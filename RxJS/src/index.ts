import { Draw } from "./Draw";
import { Field } from "./LavirintItems/Field";
import { LavirintItem } from "./LavirintItems/LavirintItem";
import { Lavirint } from "./Lavirint";
import { NoWall } from "./LavirintItems/NoWall";
import { Wall } from "./LavirintItems/Wall";
import { of, switchMap } from 'rxjs';

function createGridTemplate(numsOfFields: number, wallSize: string, fieldSize: string): string {
  return `${wallSize} ${fieldSize} `.repeat(numsOfFields).concat(`${wallSize}`);
}


const lav: Lavirint = new Lavirint();
let tok1 = lav.setLevel(0);
lav.draw(document.body, tok1);

//lav.crtaj(document.body);