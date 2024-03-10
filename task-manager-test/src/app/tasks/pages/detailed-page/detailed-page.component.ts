import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageKeys } from 'src/app/core/enums/enums';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

import { Item, Select } from '../../models';

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss'],
})

export class DetailedPageComponent implements OnInit {
  private localStorage = inject(LocalStorageService);

  private router = inject(Router);

  @Input() id = '';

  item?: Item;

  isEditPressed = false;

  ngOnInit(): void {
    this.item = JSON.parse(this.localStorage.getTasks() || '')
      .find((item: Item) => item.id === this.id);
    if (!this
      .item) {
      this.router.navigate(['not-found']);
    }
    this.returnValues();
    this.formCreateGroup.disable();
  }

  statuses: Select[] = [
    { value: 'To do', viewValue: 'To do' },
    { value: 'In progress', viewValue: 'In progress' },
    { value: 'Completed', viewValue: 'Completed' },
  ];

  priorities: Select[] = [
    { value: 'Low', viewValue: 'Low' },
    { value: 'Mediu', viewValue: 'Medium' },
    { value: 'High', viewValue: 'High' },
  ];

  performers: Select[] = [
    { value: 'Anna', viewValue: 'Anna' },
    { value: 'Pete', viewValue: 'Peter' },
    { value: 'Sam', viewValue: 'Sam' },
    { value: 'Tom', viewValue: 'Tom' },
    { value: 'Paul', viewValue: 'Paul' },
  ];

  private fb = inject(FormBuilder);

  formCreateGroup = this.fb.group({
    nameTask: ['', { nonNullable: true, validators: [Validators.required] }],
    deadline: ['', { nonNullable: true, validators: [Validators.required] }],
    status: ['', { nonNullable: true, validators: [Validators.required] }],
    priority: ['', { nonNullable: true, validators: [Validators.required] }],
    performer: ['', { nonNullable: true, validators: [Validators.required] }],
  });

  get nameTask() {
    return this.formCreateGroup.controls.nameTask;
  }

  get deadline() {
    return this.formCreateGroup.controls.deadline;
  }

  get status() {
    return this.formCreateGroup.controls.status;
  }

  get priority() {
    return this.formCreateGroup.controls.priority;
  }

  get performer() {
    return this.formCreateGroup.controls.performer;
  }

  public returnValues(): void {
    this.formCreateGroup.patchValue({
      nameTask: this.item?.nameTask || '',
      deadline: this.item?.deadline || '',
      status: this.item?.status || '',
      priority: this.item?.priority || '',
      performer: this.item?.performer || '',
    });
  }

  public back(): void {
    this.router.navigateByUrl('/main');
  }

  public edit(): void {
    this.formCreateGroup.enable();
    this.isEditPressed = true;
  }

  public cancel(): void {
    this.formCreateGroup.disable();
    this.isEditPressed = false;
    this.returnValues();
  }

  public save(): void {
    const updateTask = {
      id: this.id,
      nameTask: this.formCreateGroup.value.nameTask || '',
      deadline: this.formCreateGroup.value.deadline || '',
      status: this.formCreateGroup.value.status || '',
      priority: this.formCreateGroup.value.priority || '',
      performer: this.formCreateGroup.value.performer || '',
    };
    const tasks = JSON.parse(this.localStorage.getTasks() || '');
    Object.assign(tasks.find((elem: Item) => elem.id === updateTask.id), updateTask);
    this.localStorage.setItem(LocalStorageKeys.TASKS, JSON.stringify(tasks));

    this.formCreateGroup.disable();
    this.isEditPressed = false;
  }
}
