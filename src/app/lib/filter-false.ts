import { filter } from "rxjs";

/** Filter only false values */
export function filterFalse(){
    return filter<boolean>(val => val === false);
}