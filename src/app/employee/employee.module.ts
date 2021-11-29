import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee.component';
import { Routes,RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: '', component:EmployeeComponent },
];
@NgModule({
  declarations: [ 
    EmployeeComponent,
    AddEmployeeComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[AddEmployeeComponent]

})
export class EmployeeModule { }
