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

let c: Circle = {
    kind: ShapeKind.Circle,
    radius: 100,
}

console.log(c);
