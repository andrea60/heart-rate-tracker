export function avg<T>(array:T[], project:(item:T) => number){
    if (array.length == 0)
        return NaN;
    let sum = 0;
    for(let item of array)
        sum += project(item);
    return sum / array.length;
}