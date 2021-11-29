import { Injectable } from '@angular/core';
import { EMPLOYESS } from './mock-data/all-employees';
import { Employee } from './interfaces/employee';
import { Title } from './interfaces/job-title';
import { TitleList } from './mock-data/titles'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  filteredEmployees(emp): Employee[] {
    let employees = EMPLOYESS.filter(element => {
      // Filter by JOB & AGE as suggested in point no. 3
      if (element.age == emp.age && element.jobTitle == emp.title) {
        return element
      }
      //by Age only
      else if (element.age == emp.age) {
        return element

      }
      //by JOB only
      else if (element.jobTitle == emp.title) {
        return element
      }

      // Filter by Start Date & End Date as suggested in point no. 2
      if (emp.startDate && emp.endDate) {
        let empStartDate = new Date(emp.startDate);
        let eleStartDate = new Date(element.startDate);
        let empEndDate = new Date(emp.endDate);

        let eleEndDate;
        if(element.endDate=='Currently Working'){
          eleEndDate = this.getCurrentDate();
          eleEndDate = new Date(eleEndDate);
        }else{
          eleEndDate = new Date(element.endDate);
        }

        if (eleStartDate >= empStartDate && eleEndDate <= empEndDate) {
          return element;

        }
      }
      //By Start Date only
      else if (emp.startDate) {
        let empStartDate = new Date(emp.startDate);
        let eleStartDate = new Date(element.startDate);
        console.log(empStartDate, " ", eleStartDate)
        if (eleStartDate >= empStartDate) {
          return element;

        }
      }
      //By End Date only
      else if (emp.endDate) {
        let empEndDate = new Date(emp.endDate);
        let eleEndDate;
        if(element.endDate=='Currently Working'){
          eleEndDate = this.getCurrentDate();
          eleEndDate = new Date(eleEndDate);

        }else{
          eleEndDate = new Date(element.endDate);
        }
        
        if (eleEndDate <= empEndDate) {
          return element;
        }
      }

    })
    return employees;
  }

 getCurrentDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 

  getEmployees(): Employee[] {
    return EMPLOYESS;
  }

  getEmployee(emp) {
    return this.getEmployees().find(x => x.id == emp.id)
  }

  addNewEmployee(emp: Employee) {
    emp.id = Math.random().toString(16).slice(2);
    this.getEmployees().unshift(emp);
  }

  updateEmployeeDetail(emp) {
    let index = this.getEmployees().findIndex(x => x.id == emp.id);
    console.log(index, "index")
    if (index > -1) {
      let empArray = this.getEmployees();
      empArray[index].name = emp.name;
      empArray[index].jobTitle = emp.jobTitle;
      empArray[index].age = emp.age;
      empArray[index].startDate = emp.startDate;
      empArray[index].endDate = emp.endDate;
    }
    return index;
  }

  deleteEmployeeDetail(emp: Employee) {
    let index = this.getEmployees().findIndex(x => x.id == emp.id);
    if (index > -1) {
      this.getEmployees().splice(index, 1);
    }
  }

  filterByName(name): Employee[] {
    let employee = EMPLOYESS.filter(element => {
      if (element.name.toLocaleLowerCase().includes(name)) {
        return element
      }
    })

    return employee;
  }

  getTitles(): Title[] {
    return TitleList;
  }
}
