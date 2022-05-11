import { filter } from "rxjs";

/** Filter only true values  */
export function filterTrue(){
    return filter<boolean>(val => val === true);
}


export const whenTrue = filterTrue;