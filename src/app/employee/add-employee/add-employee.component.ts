import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee/employee.service';
import { Title } from 'src/app/employee/interfaces/job-title';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  titleList: Title[] = []
  addEmployeeForm: FormGroup;
  isEdit: boolean = false;
  submitted: boolean = false;
  constructor(private employeeService: EmployeeService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.getTitles();
    this.addEmployeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      jobTitle: ['', Validators.required],
      age: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
    if (this.data && this.data != undefined) { //In case of Update
      this.setData();
      this.isEdit = true;
    }
  }

  setData() {
    this.addEmployeeForm.patchValue(this.data);
  }


  getTitles() {
    this.titleList = this.employeeService.getTitles();
  }

  submitData() {
    this.submitted = true;
    this.addEmployeeForm.markAllAsTouched();
    if (this.addEmployeeForm.invalid) {

    } else if (this.isEdit == true) {         //For updating the record
      let value = this.employeeService.updateEmployeeDetail(this.addEmployeeForm.value);
      if (value > -1) {
        this.dialogRef.close();
      }

    }
    else {      //For adding the new record
      this.employeeService.addNewEmployee(this.addEmployeeForm.value);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
