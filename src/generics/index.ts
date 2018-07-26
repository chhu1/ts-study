class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    public keeper: BeeKeeper;
}

class Lion extends Animal {
    public keeper: ZooKeeper;
}

export function createInstance<A extends Animal>(c: new () => A): A {
    const a: A = new c();
    console.log(a.numLegs);
    return a;
}

// createInstance(Lion).keeper.nametag;
// createInstance(Bee).keeper.hasMask;
