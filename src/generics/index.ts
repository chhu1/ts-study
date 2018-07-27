class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

// 区分概念（重点）
// Animal是类
// typeof Animal是Animal的构造函数类型，这是一个类型，举个例子：let A: typeof Animal = Animal
// Animal是一个类型，是Animal实例化对象的类型
// 例子：let animal: Animal = new Animal() 第一个Animal代表类型，第二个Animal是类
class Animal {
    numLegs: number;
}

class Bee extends Animal {
    public keeper: BeeKeeper;
}

class Lion extends Animal {
    public keeper: ZooKeeper;
}

// 范型约束：A extends Animal，因为代码中取a.numLegs，只有Animal类型才有，因此类型约束为Animal
// 泛型里使用类类型：new () => A，A类型是Animal类型的子类，c参数定义为new的值返回A类型，因此c参数为A的构造函数类型，也就是Animal子类的构造类型 
export function createInstance<A extends Animal>(c: new () => A): A {
    const a: A = new c();
    console.log(a.numLegs);
    return a;
}

// createInstance(Lion).keeper.nametag;
// createInstance(Bee).keeper.hasMask;
