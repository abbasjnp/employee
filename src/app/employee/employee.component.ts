import { Component, OnInit } from '@angular/core';
import { Employee } from './interfaces/employee';
import { EmployeeService } from './employee.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { Title } from 'src/app/employee/interfaces/job-title';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, takeWhile, distinctUntilChanged } from 'rxjs/operators'
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  titleList: Title[] = [];
  filterForm: FormGroup;
  constructor(private employeeService: EmployeeService,
    public dialog: MatDialog,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildFilterForm();
    this.getEmployees();

    // this.resetFilterForm();
    this.getTitles();

    this.filterForm.get('name').valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(
      term => {
        if(term!=null){
          this.getFilteredList(term)

        }
      }
    )
  }

  resetFilterForm() {
   this.filterForm.reset();
   this.getEmployees();
  }


  buildFilterForm() {
    this.filterForm = this.fb.group({
      name: [''],
      title: [''],
      age: [''],
      startDate: [''],
      endDate: ['']
    })
  }

  getFilteredList(term) {
    console.log(term,"term")
    this.employees = this.employeeService.filterByName(term);
  }

  getTitles() {
    this.titleList = this.employeeService.getTitles();

  }

  getEmployees() {
    this.employees = this.employeeService.getEmployees();
    console.log(this.employees);
  }

  filterData() {
    console.log(this.filterForm.value,"value");
    let x = this.filterForm.value;
     if(x.title=='' && x.age=='' && x.startDate=='' && x.endDate==''){
       return;
     }else{
       this.employees = this.employeeService.filteredEmployees(this.filterForm.value);

     }
  }

  openDialog(employeeData?) {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '500px',
      data: employeeData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getEmployees();
    });
  }

  updateEmployeeDetails(emp) {
    let employee = this.employeeService.getEmployee(emp);
    this.openDialog(employee);
  }

  deleteEmployeeDetail(emp) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result == 'confirm') {
        this.employeeService.deleteEmployeeDetail(emp);
        this.getEmployees();
      }
    });
  }


}
