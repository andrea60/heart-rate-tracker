import { filter } from "rxjs";


/** Filter based on a whitelist of possible values */
export function filterValue<T>(whitelist:T | T[]){
    const allowed = Array.isArray(whitelist) ? whitelist : [whitelist];
    return filter<T>((val:T) => allowed.some(v => v === val));
}