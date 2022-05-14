
import { from, map, Observable, ObservableInput, OperatorFunction, switchMap, take } from "rxjs";
import { switchAdd } from "./switch-add";

export function joinState<T, I>(project:(value:T, index:number) => ObservableInput<I>): OperatorFunction<T, [T, I]>{
    return switchAdd((v,i) => from(project(v,i)).pipe(take(1), map(s => s)));
}