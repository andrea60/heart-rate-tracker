export function writeStyle(style:{[key:string]:string}){
    let str = '';
    for(const key in style)
        str += key+':'+style[key]+";";
    return str;
}