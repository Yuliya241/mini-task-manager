import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LocalStorageKeys } from 'src/app/core/enums/enums';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

import { Item } from '../../models';
import { performersVariable, prioritiesVariable, statusesVariable } from '../../variables';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})

export class MainPageComponent implements OnInit {
  private fb = inject(FormBuilder);

  private localStorage = inject(LocalStorageService);

  items?: Item[] = [];

  statuses = statusesVariable;

  priorities = prioritiesVariable;

  performers = performersVariable;

  isSubmitted = false;

  ngOnInit(): void {
    if (this.localStorage.getTasks() !== null) {
      this.items = JSON.parse(this.localStorage.getTasks() || '');
    }
  }

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

  public add(): void {
    const newTask = {
      id: `${Date.now()}`,
      nameTask: this.formCreateGroup.value.nameTask || '',
      deadline: this.formCreateGroup.value.deadline || '',
      status: this.formCreateGroup.value.status || '',
      priority: this.formCreateGroup.value.priority || '',
      performer: this.formCreateGroup.value.performer || '',
    };
    if (this.formCreateGroup.valid) {
      this.items?.push(newTask);
      this.formCreateGroup.reset();
      this.localStorage.setItem(LocalStorageKeys.TASKS, JSON.stringify(this.items));
    }
    this.formCreateGroup.reset();
    this.isSubmitted = true;
  }
}
