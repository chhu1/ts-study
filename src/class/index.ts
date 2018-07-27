import './typeof'

import Dog from './attribute';
import { Department, AccountingDepartment } from './abstract';

// 抽象父类的类型子类的实现
let department: Department = new AccountingDepartment();
department.printName();
department.printMeeting();
// department.generateReports(); 
