interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(type?: string): Fish | Bird {
    let bird: Bird = {
        fly(): void {
            console.log('fly');
        },
        layEggs(): void {}
    };
    let fish: Fish = {
        swim(): void {},
        layEggs(): void {}
    };
    if (type && type.indexOf('fish') > -1) {
        return fish;
    } else {
        return bird;
    }
}

let pet = getSmallPet('fish');
// 并非所有的pet都有swim和fly，因此不能直接使用。但是为了能直接使用，这里必须用<类型断言>(重点)
// 使用了三次类型断言，冗余的代码可以用类型保护去掉
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
} else {
    (<Bird>pet).fly();
}

// 类型保护
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

// 定义类型
type stringOrNumber = string | number;
// <keyof>(难点+重点)
// 注意定义了两个范型变量T和K，但是T和K并非完全独立，他们之间存在一种keyof的关系
// 举个例子：Person有name和age两个key，pluck函数传入两个参数，第一个参数如果传入Person类型，那么keyof Person的值是name | age
//         K extends keyof T类型也就是name | age，那么pluck函数的第二个参数类型是K[]的数组，也就是name | age的数组
// 注意返回值：T[K][]可以这样理解（T[K]）[]，即函数返回是T的value的数组
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: stringOrNumber[] = pluck(person, ['name', 'age']);

// keyof实践(难点+重点)
// Readonly和Partial已经内置
namespace newKeyof {
    interface Person {
        name: string;
        age: number;
    }
    // 需求
    // interface PersonOne {
    //     name: string;
    //     age: number;
    //     ...二十多个属性
    // }
    // interface PersonTwo {
    //     readonly name: string;
    //     readonly age: number;
    //     readonly ...二十多个属性
    // }
    // 问题：代码冗余
    // 解决问题：有没有一种方式，可以像函数那样呢？type PersonTwo = f(PersonOne, readonly)
    // 解决方案：type不仅可以定义类型，还能定义高级类型（类似函数式编程的高阶函数）
    // 举例：Readonly是高级类型，T是定义范型变量，也就是的高级类型的参数。换种理解方式就是Readonly是函数，T是函数参数，下面的代码也就不难理解了

    // 解释一下in，a in b的意思是a类型存在于b中
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    }
    type Partial<T> = {
        [P in keyof T]?: T[P];
    }
    type PersonPartial = Partial<Person>;
    type ReadonlyPersonPartial = Partial<Readonly<Person>>;
}

