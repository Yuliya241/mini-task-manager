import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TasksListPageComponent } from './pages/tasks-list-page/tasks-list-page.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    DetailedPageComponent,
    TasksListPageComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
  ],
})
export class TasksModule { }
