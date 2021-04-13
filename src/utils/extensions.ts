export {}
declare global {
    interface Array<T> {
        toggle: (value: T) => Array<T>,
        unify: (predicate: (a:T, b:T) => boolean) => Array<T>
    }
}

Array.prototype.toggle = function<T>(value: T): Array<T> {
    const index = this.indexOf(value);
    if (index === -1) {
        this.push(value);
    } else {
        this.splice(index, 1);
    }
    return this;
};

Array.prototype.unify = function<T>(key:any): Array<T> {
    if (this.length === 0 || this.length === 1) return this;
    if (!Object.prototype.hasOwnProperty.call(this[0], key)) return this;
    return this.filter((item, index) => this.findIndex(item2 => item[key] === item2[key]) === index);
}
