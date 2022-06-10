import { tap } from "rxjs";

export function log<T>(msg:string) {
    return tap<T>(val => {
        const now = new Date().toISOString();
        return console.log(now+' - '+msg+':', val);
    })
}