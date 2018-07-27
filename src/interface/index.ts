// 额外的属性检查
export interface BaseInterfaceOne {
    [propName: string]: string;
}

// 可索引的接口
export interface BaseInterfaceTwo {
    [index: number]: string;
}

let arrayTwo: BaseInterfaceTwo = ['1', '2', '3'];

// 函数接口
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
    // 类型断言
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

// 接口定义本身不会出错，但是上面的接口无法实现
// 原因：实现方式一：同时定义出['1', '2'] 和 ['1', '2'].findNext。JS机制原因，显然做不到。
//      实现方式二：先定义出['1', '2']，再定义['1', '2'].findNext。数组和ErrorArrayLike是不用的类型，这里使用类型断言可以解决报错
// 结果：看似可行的方式二报错，数组不能转化成ErrorArrayLike。原因他们不是一种类型，无法转化。就好比把数组转化成interface A {}，当然无法实现。
// let errorArrayLike: ErrorArrayLike = <ErrorArrayLike>['1', '2'];
// errorArrayLike.findNext = function(next: number): string {
//     return 'string';
// }

// 上面方式二无法实现，但是方式二是一种思路。需要解决的问题是数组和ErrorArrayLike是一种类型，最简单的办法自然是接口继承类。
export interface ArrayLike<T> extends Array<T> {
    constructor(items?: Array<T>): void;
    findNext(next: number): string
}

// ArrayLike<string>字符串类数组
// <ArrayLike<string>>类型断言为字符串类数组，而不是字符串数组
let arrayLike: ArrayLike<string> = <ArrayLike<string>>['1', '2'];
arrayLike.findNext = function(next: number): string {
    return 'string';
}

// 最容易理解和使用最多的创建类数组的方式
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
