import { of } from 'rxjs';
import types from 'src/data/activity-types.json'
export function getActivityTypes(){
    return of(types);
}