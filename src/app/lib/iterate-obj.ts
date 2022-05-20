export function iterateObj<T>(obj:{[key:number]:T}){
    let res = [];
    for(let item in obj)
        res.push({ key: parseInt(item), value: obj[item] });
    return res;
}