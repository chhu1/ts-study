enum Color {Red, Green, Blue}

enum ColorOne {Red = 1, Green, Blue}

enum ColorTwo {Red, Green, Blue = 3}

enum ColorThree {Red = 1.5, Green, Blue}

enum ColorFour {Red = 1.5, Green = 1, Blue}

enum ColorFive {Red = 'red', Green = 1, Blue}

enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

// 枚举类型也不可以混用，即使值类型相同
// let c: Circle = {
//     kind: ShapeKind.Square,
//     radius: 100,
// }

let c: Circle = {
    kind: ShapeKind.Circle,
    radius: 100,
}

console.log(c);
