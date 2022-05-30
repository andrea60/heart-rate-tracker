export function groupBy<T, TKey extends string | number>(arr:T[], project:(item:T, index:number) => TKey){
    const groups = {} as Record<TKey, T[]>;
    let i =0;
    for(let item of arr){
        const key = project(item,i++);
        if (!(key in groups))
            groups[key] = [];
        groups[key].push(item);
    }
    return groups;
}


