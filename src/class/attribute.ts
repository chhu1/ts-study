// 参数属性
class Animal {
    private tag: string
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
