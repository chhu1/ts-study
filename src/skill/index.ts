// 获取值的类型
namespace valueType{
    let defaultState = {
        foo: 7,
        bar: 'hello'
    };
    
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
    
    type State = ReturnType<typeof getState>;
    
    // let nextState: State = {
    //     foo: 'seven',
    //     bar: 'world'
    // };
}

// 条件类型
namespace conditionName {
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    }
    type Diff<T, U> = T extends U ? never : T;
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
    type ReturnType<T> = T extends (args: any[]) => infer U ? U : never;
}

// 条件类型和infer
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
