import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'salary', 'actions'];
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe((data) => (this.employees = data));
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  openDialog(employee?: Employee) {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data: employee || {},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadEmployees();
    });
  }
}
