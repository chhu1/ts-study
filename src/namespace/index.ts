/// <reference path="name1.ts" />
/// <reference path="name2.ts" />
import { ModuleA, ModuleB } from './module';

let nameA = new Name.NameA();
let nameB = new Name.NameB();

let moduleA = new ModuleA.ModuleAClass();
let moduleB = new ModuleB.ModuleBClass();

// 总结：文件之间用ES6 module，文件内可以同namespace，文件之间同时用namespace和ES6 module会出错
