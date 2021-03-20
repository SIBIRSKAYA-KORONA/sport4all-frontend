export const getPageName = ():string => {
    const path = new URL(document.URL).pathname;
    const secondSlash = path.indexOf('/', 1);
    return path.slice(0, secondSlash > 0 ? secondSlash : path.length);
}
