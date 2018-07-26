// 重载
export interface A {
    a(b: string): boolean;
    a(b: number): number;
}

export class B implements A {
    a(b): any {
        let c: number = 1;
        if (typeof b == 'string') {
            return true;
        } else if (typeof b == 'number') {
            return c;
        }
    }
}

// this参数
interface C {
    type: string[];
    createType(this: C, newType: string): () => { a: string };
}
let deck: C = {
    type: ['abc'],
    createType: function(this: C, newType: string): () => { a: string } {
        return () => {
            return { a: this.type[1] || newType };
        }
    }
}

const defType = deck.createType('def')();
