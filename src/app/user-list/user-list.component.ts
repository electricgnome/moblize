import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})


export class UserListComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder) {
  }

i = 1;
userName = '';
eMail = '';
editCache = {};
dataSet = [
{
  key    : '0',
  name   : 'Edward King 0',
  email    : 'edward0@king.com',
 
},
{
  key    : '1',
  name   : 'Edward King 1',
  email    : 'edward1@king.com',
 
}
];

addRow(): void {
this.i++;
this.dataSet = [ ...this.dataSet, {
  key    : `${this.i}`,
  name   : `${this.userName}`,
  email    : `${this.eMail}`,
} ];
this.updateEditCache();
}

deleteRow(i: string): void {
const dataSet = this.dataSet.filter(d => d.key !== i);
this.dataSet = dataSet;
}

startEdit(key: string): void {
this.editCache[ key ].edit = true;
}

finishEdit(key: string): void {
this.editCache[ key ].edit = false;
this.dataSet.find(item => item.key === key).name = this.editCache[ key ].name;
this.dataSet.find(item => item.key === key).email = this.editCache[ key ].email;

}

updateEditCache(): void {
this.dataSet.forEach(item => {
  if (!this.editCache[ item.key ]) {
    this.editCache[ item.key ] = {
      edit: false,
      name: item.name,
      email: item.email
    };
  }
});
}

ngOnInit(): void {
this.updateEditCache();
this.validateForm = this.fb.group({
  userName: [ null, [ Validators.required ] ],
  email: [ null, [ Validators.required ] ],
  remember: [ true ]
  });
}

}
