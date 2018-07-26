import './typeof'

import Dog from './attribute';
import { Department, AccountingDepartment } from './abstract';

// let department: Department;
// department = new Department();
let department: AccountingDepartment;
department = new AccountingDepartment();
department.printName();
department.printMeeting();
department.generateReports();
