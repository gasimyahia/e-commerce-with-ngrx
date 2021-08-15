import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userModel } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userForm:FormGroup;
  isLogin=false;

  constructor(
              private userService:UserService,
              public toastService: ToastService,
              private formBulider:FormBuilder
             ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.userForm=this.formBulider.group({
      name:['',[Validators.required]],
      email:[null,[Validators.required]],
      password:[null,[Validators.required]],
      cpassword:[null,[Validators.required]],
      admin:null
    });
  }

  onRegister(){
    if(this.userForm.value.password != this.userForm.value.cpassword)
    {
      this.toastSuccess("Both Password Must be Same");
    }else{
      let user=new userModel();
      user.name=this.userForm.value.name;
      user.email=this.userForm.value.email;
      user.password=this.userForm.value.password;
      user.admin=0;
      this.userService.add(user).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.isLogin=true;
        this.userService.isLogin=true;
        this.resetForm(this.userForm);
      },
      error=>{
        error.error.error.forEach(element=>{this.toastDanger(element);});
      }
    );
    }
  }

  toastSuccess(message) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  toastDanger(message) {
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: 5000 });
  }

  resetForm(form: FormGroup) {
		form.reset();
	}

}
