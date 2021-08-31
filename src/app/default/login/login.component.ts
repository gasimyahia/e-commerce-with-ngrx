import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  registerForm:FormGroup;
  submitted=false
  isLogin=false;
  errorMessage:any='';

  constructor(
              private formBulider:FormBuilder,
              private userService:UserService,
              public toastService: ToastService,
              private route:ActivatedRoute,
              private router:Router
             ) { }

  ngOnInit(): void {
    this.initForm();
  }

  get f(){
    return this.loginForm.controls;
  }

  onLogin(){
    this.submitted=true;
    if(this.loginForm.invalid){
      this.errorMessage="Please enter username & password";
      return;
    }

    const formData=new FormData();
    formData.append("email",this.loginForm.value.email);
    formData.append("password",this.loginForm.value.password);
    this.userService.login(formData).subscribe(
      res=>{
        if(res['user'] != null){
          this.toastSuccess(res['message']);
          localStorage.setItem("pm_user",JSON.stringify(res['user']));
          this.resetForm(this.loginForm);
          this.isLogin=true;
          this.userService.setAuthenticated(this.isLogin);
          let logUser=res['user'];
          if(logUser.admin===1){
            this.router.navigateByUrl('admin/products');
          }else{
            this.router.navigateByUrl('/');
          }
        }else{
          this.toastDanger(res['error']);
          this.submitted=true;
          this.errorMessage=res['error'];
        }

      },
      error=>{
        error.error.error.forEach(element=>{this.toastDanger(element);});
      }
    );

  }

  onRegister(){
    this.submitted=true;
    if(this.registerForm.invalid){
      this.errorMessage="Please enter username & email & password";
      return;
    }

    if(this.registerForm.value.password != this.registerForm.value.cpassword)
    {
      this.errorMessage="Both Password Must be Same";
      return;
    }

    const formData=new FormData();
    formData.append("name",this.registerForm.value.name);
    formData.append("email",this.registerForm.value.email);
    formData.append("password",this.registerForm.value.password);
    this.userService.add(formData).subscribe(
      (res:any)=>{
        if(res['user'] != null){
          this.toastSuccess(res['message']);
          localStorage.setItem("pm_user",JSON.stringify(res['user']));
          this.resetForm(this.loginForm);
          this.isLogin=true;
          this.userService.setAuthenticated(this.isLogin);
          let logUser=res['user'];
          if(logUser.admin===1){
            this.router.navigateByUrl('admin/products');
          }else{
            this.router.navigateByUrl('/');
          }
        }else{
          this.toastDanger(res['message']);
          this.submitted=true;
          this.errorMessage=res['message'];
        }
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );

  }

  toggleRegister(){
    document.getElementById("regForm").style.transform="translateX(0px)";
    document.getElementById("loginForm").style.transform="translateX(0px)";
    document.getElementById("indicator").style.transform="translateX(100px)";
    this.errorMessage='';
  }

  toggleLogin(){
    document.getElementById("regForm").style.transform="translateX(300px)";
    document.getElementById("loginForm").style.transform="translateX(300px)";
    document.getElementById("indicator").style.transform="translateX(0px)";
    this.errorMessage='';
  }

  private initForm(){
    this.loginForm=this.formBulider.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    });

    this.registerForm=this.formBulider.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      cpassword:['']
    });
  }


  toastSuccess(message) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  toastDanger(message) {
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: 5000 });
  }

  resetForm(form){form.reset()}


}
