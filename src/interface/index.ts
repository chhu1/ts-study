// 复习基础
export interface BaseInterfaceOne {
    [propName: string]: string;
}

export interface BaseInterfaceTwo {
    [index: number]: string;
}

let arrayTwo: BaseInterfaceTwo = ['1', '2', '3'];

export interface BaseInterfaceThree {
    (source: string): boolean;
}

// 混合接口
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 1000;
    counter.reset = function () { };
    return counter;
}

// 接口继承类
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

// class Image implements SelectableControl {
//     select() { }
// }

// array-like
export interface ErrorArrayLike {
    [index: number]: string;
    findNext(next: number): string;
}

// let errorArrayLike: ErrorArrayLike = <ErrorArrayLike>['1', '2'];
// errorArrayLike.findNext = function(next: number): string {
//     return 'string';
// }

export interface ArrayLike<T> extends Array<T> {
    constructor(items?: Array<T>): void;
    findNext(next: number): string
}

let arrayLike: ArrayLike<string> = <ArrayLike<string>>['1', '2'];
arrayLike.findNext = function(next: number): string {
    return 'string';
}

export class NewArrayConstructor<T> extends Array<T> {
    constructor(items?: Array<T>) {
        super(...items);
        Object.setPrototypeOf(this, Object.create(NewArrayConstructor.prototype));
    }
    findNext(next: number): string {
        return 'string'
    }
}

let newArray = new NewArrayConstructor<string>(['1', '2', '3']);
