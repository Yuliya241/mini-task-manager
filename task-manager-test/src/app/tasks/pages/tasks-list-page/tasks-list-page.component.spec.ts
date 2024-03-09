import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListPageComponent } from './tasks-list-page.component';

describe('TasksListPageComponent', () => {
  let component: TasksListPageComponent;
  let fixture: ComponentFixture<TasksListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListPageComponent],
    });
    fixture = TestBed.createComponent(TasksListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
