import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService, Employee } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employeeForm = this.fb.group({
      name: [data.name || '', Validators.required],
      salary: [data.salary || '', [Validators.required, Validators.min(1)]],
    });
  }

  submit() {
    if (this.data.id) {
      this.employeeService.updateEmployee(this.data.id, this.employeeForm.value).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
