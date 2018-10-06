import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  userName = "";
  eMail = "";
  editCache = {};
  dataSet: any;

  addRow(): void {
    if (this.dataSet.find(item => item.email === this.eMail) === undefined) {
      this.http
        .post("/api/", {
          name: this.userName,
          email: this.eMail.toLowerCase()
        })
        .subscribe(res => {
          this.dataSet = [
            ...this.dataSet,
            {
              _id: Object(res)._id,
              name: this.userName,
              email: this.eMail.toLowerCase()
            }
          ];
          this.updateEditCache();
        });
    }
  }

  deleteRow(i: string): void {
    const dataSet = this.dataSet.filter(d => d._id !== i);
    this.http.delete(`/api/${i}`).subscribe(res => {
      this.dataSet = dataSet;
      this.updateEditCache();
    });
  }

  startEdit(_id: string): void {
    this.editCache[_id].edit = true;
  }

  finishEdit(_id: string): void {
    this.http
      .put(`/api/${_id}`, {
        name: this.editCache[_id].name,
        email: this.editCache[_id].email.toLowerCase()
      })
      .subscribe(res => {
        this.editCache[_id].edit = false;
        this.dataSet.find(item => item._id === _id).name = this.editCache[
          _id
        ].name;
        this.dataSet.find(item => item._id === _id).email = this.editCache[
          _id
        ].email;
      });
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item._id]) {
        this.editCache[item._id] = {
          edit: false,
          name: item.name,
          email: item.email
        };
      }
    });
  }

  ngOnInit(): void {
    this.http.get("/api").subscribe(res => {
      this.dataSet = res;
      this.updateEditCache();
    });

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      remember: [true]
    });
  }
}
