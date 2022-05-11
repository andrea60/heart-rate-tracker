import { ObservableInput, ObservedValueOf, switchMap } from "rxjs";

/**
 * Executes a switchMap operator but ensure the outer value is not lost by returning an array (size=2) with the outer value
 * as the first element and the inner value as the second
 * @param project The projection function (same as switchMap)
 * @returns An array with the outer value at index 0 and the inner value at index 1
 */
export function switchAdd<T, O extends ObservableInput<I>, I>(project:(value:T, index:number) => O){
    return switchMap(project, (outer, inner) => ([outer, inner]) as [T, ObservedValueOf<O>]);
}