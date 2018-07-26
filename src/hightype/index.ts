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

// keyof
type stringOrNumber = string | number;
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

// 已经内置
// type Readonly<T> = {
//     readonly [P in keyof T]: T[P];
// }
// type Partial<T> = {
//     [P in keyof T]?: T[P];
// }
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
