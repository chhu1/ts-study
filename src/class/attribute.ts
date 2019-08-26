// 参数属性简化代码
class Animal {
    private tag: string = 'abc'
    constructor(private name: string) {
        this.tag = 'animal';
    }
    move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

export default class Dog extends Animal {
    constructor(name: string, private type: string) {
        super(name);
    }
}
