import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { LocalStorageService } from 'src/app/core/services/local-storage.service';

import { Item } from '../../models';

@Component({
  selector: 'app-tasks-list-page',
  templateUrl: './tasks-list-page.component.html',
  styleUrls: ['./tasks-list-page.component.scss'],
})
export class TasksListPageComponent implements OnInit, AfterViewInit {
  private localStorage = inject(LocalStorageService);

  private router = inject(Router);

  private liveAnnouncer = inject(LiveAnnouncer);

  items?: Item[] = [];

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort?: MatSort;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(JSON.parse(this.localStorage.getTasks() || ''));

    this.dataSource.sort = this.sort || null;
  }

  ngOnInit(): void {
    if (this.localStorage.getTasks() !== null) {
      this.items = JSON.parse(this.localStorage.getTasks() || '');
    }
  }

  public back(): void {
    this.router.navigateByUrl('/main');
  }

  displayedColumns: string[] = ['nameTask', 'status', 'performer', 'deadline'];

  public announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  public applyFilter(event: any): void {
    const filterValue = event.target?.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
