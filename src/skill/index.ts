// 获取值的类型
namespace valueType{
    let defaultState = {
        foo: 7,
        bar: 'hello'
    };
    
    // typeof值获取其interface定义
    type State = typeof defaultState;
    
    // let nextState: State = {
    //     foo: 'seven',
    //     bar: 'world'
    // };
}

// 获取函数的返回值的类型
namespace returnValueType{
    function getState() {
        return {
            foo: 7,
            bar: 'hello'
        };
    }
    
    // 函数接口 = typeof 函数（上面讲过）
    // ReturnType<函数接口>获取函数返回类型的interface定义
    type State = ReturnType<typeof getState>;
    
    // let nextState: State = {
    //     foo: 'seven',
    //     bar: 'world'
    // };
}

// 条件类型（重点+难点）2.8版本的发布让以前很多没办法定义的类型，变得都可以定义
namespace conditionName {
    // 需求
    // interface PersonOne {
    //     a1: string;
    //     a2: number;
    //     ...三十个属性
    //     a30: number;
    // }
    // interface PersonTwo {
    //     a1: string;
    //     a2: number;
    //     a15: string;
    //     a21: string;
    //     ...二十五个属性
    //     a30: number;
    // }
    // 问题：代码冗余
    // 解决问题：type PersonTwo = Omit<PersonOne, 'a16' | 'a17' | 'a18' | 'a19' | 'a20'>，写出来Omit就好了;
    // keyof和in在hightype那里已经解释清楚
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    }
    // B extends A ? B : A
    // 如果两个都是简单类型class A {}，Class B extends A {}，则返回B
    // T extends U ? never : T
    // 如果T和U是联合类型，则T的每个类型分别和U比较
    // 举个例子：T是a | b | c | d，U是c | d | e | f
    // a extends c | d | e | f ? never : a 值是a
    // b extends c | d | e | f ? never : b 值是b
    // c extends c | d | e | f ? never : c 值是never
    // d extends c | d | e | f ? never : d 值是never
    // 结果是a | b。
    type Diff<T, U> = T extends U ? never : T;
    // 组合一下：
    // interface T {
    //     a: string,
    //     b: number,
    //     c: boolean,
    //     d: () => string
    // }
    // 那么k可以继承于a | b | c | d，假设是a | b。
    // Diff<keyof T, K>是c | d。
    // Pick<T, 'c | d'>结果也就很清晰了
    // interface T {
    //     c: boolean,
    //     d: () => string
    // }
    // 于是实现需求
    type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

    let defaultState = {
        foo: 7,
        bar: 'hello',
        getState() {
            return 'hello';
        }
    };
    
    type State = typeof defaultState;
    type OmitState = Omit<State, 'foo' | 'getState'>;
    
    let nextState: OmitState = {
        bar: 'world'
    };
}

// 条件类型和infer自己实现returnType
namespace myReturnType {
    // 想取函数的的返回值类型，这个类型肯定不是我定义的。那怎么返回这个变量呢？条件类型和infer解决了这类问题。
    // 当你需要取一个不是你自己定义的类型的时候，就该考虑条件类型和infer了
    // infer作用也很明显，在等式右边将某个值赋值给类型U（类型U没在等式左边定义，不是自己定义的）
    type ReturnType<T> = T extends (args: any[]) => infer U ? U : never;
}

// 条件类型和infer，读懂下面代码，练习一下
namespace inferName {
    type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T;

    type T0 = Unpacked<string>;
    type T1 = Unpacked<string[]>;
    type T2 = Unpacked<() => string>;
    type T3 = Unpacked<Array<() => string>>;
    type T4 = Unpacked<() => string[]>;
    type T5 = Unpacked<Unpacked<Array<() => string>>>;

    interface A {
        t0: T0;
        t1: T1;
        t2: T2;
        t3: T3;
        t4: T4;
        t5: T5;
    }

    let a: A = {
        t0: 't0',
        t1: 't1',
        t2: 't2',
        t3() {
            return 't3'
        },
        t4: ['t4'],
        t5: 't5'
    }
}
