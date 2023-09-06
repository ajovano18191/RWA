import { createFeatureSelector } from "@ngrx/store";
import { Odds } from "../sport.component";

export const selectOddses = createFeatureSelector<Map<number, Map<number, Map<number, Odds>>>>('oddses');