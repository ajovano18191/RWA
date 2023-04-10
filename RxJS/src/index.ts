import { from, mergeMap, switchMap, tap, count, reduce, map, toArray } from "rxjs";
import { Lavirint } from "./Lavirint/Lavirint";
import { Draw } from "./Draw";

const lav: Lavirint = new Lavirint();
lav.draw(document.body);



  