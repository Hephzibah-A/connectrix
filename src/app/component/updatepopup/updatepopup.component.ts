import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  constructor(private builder: FormBuilder, private auth: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.auth.getuserrole().subscribe(res => {
      this.rolelist = res;
    });



  }
  ngOnInit(): void {
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loaduserdata(this.data.usercode);
    }
  }
  rolelist: any;
  editdata: any;

  roleform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    phone: this.builder.control(''),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  loaduserdata(code: any) {
    this.auth.detail().subscribe(res => {
      this.editdata = res;
      console.log(this.editdata);
      this.roleform.setValue({
        id: this.editdata.id, name: this.editdata.name,
        password: this.editdata.password, email: this.editdata.email, phone: this.editdata.phone,
        role: this.editdata.role, isactive: this.editdata.isactive
      });
    });
  }
  UpdateUser() {
    this.auth.detail().subscribe(res => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }

}