export function sortBy<T>(arr:T[], project:(item:T) => any, dir:'asc' | 'desc' = 'asc'){
    return arr.sort((a,b) => {
        let vA = project(a);
        let vB = project(b);
        if (typeof vA != typeof vB)
            throw 'Cannot compare different types';
        return (vA - vB) * (dir === 'desc' ? -1 : 1);
    })
}