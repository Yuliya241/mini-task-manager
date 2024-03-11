import { Select } from './models';

export const statusesVariable: Select[] = [
  { value: 'To do', viewValue: 'To do' },
  { value: 'In progress', viewValue: 'In progress' },
  { value: 'Completed', viewValue: 'Completed' },
];

export const prioritiesVariable: Select[] = [
  { value: 'Low', viewValue: 'Low' },
  { value: 'Mediu', viewValue: 'Medium' },
  { value: 'High', viewValue: 'High' },
];

export const performersVariable: Select[] = [
  { value: 'Anna', viewValue: 'Anna' },
  { value: 'Pete', viewValue: 'Peter' },
  { value: 'Sam', viewValue: 'Sam' },
  { value: 'Tom', viewValue: 'Tom' },
  { value: 'Paul', viewValue: 'Paul' },
];

export const displayedColumnsVariable: string[] = ['nameTask', 'status', 'performer', 'deadline'];
