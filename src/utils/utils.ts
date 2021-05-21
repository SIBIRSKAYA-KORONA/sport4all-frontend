import './extensions';

export const getPageName = ():string => {
    const path = new URL(document.URL).pathname;
    const secondSlash = path.indexOf('/', 1);
    return path.slice(0, secondSlash > 0 ? secondSlash : path.length);
}

export function lettersForAvatar(name?:string): string {
    if (!name) return '';
    const arr = name.toLocaleUpperCase().split(' ');
    if (arr.length === 1) return arr[0][0];
    if (arr.length >= 2) return arr[0][0] + arr[1][0];
}

export function dateWithSlashes(date: Date):string {
    return date.toLocaleDateString('en-GB');
}

export function parseSeconds(secs:number):string {
    return dateWithSlashes(new Date(secs*1000));
}
