import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { login } from 'src/app/models/login';
import { userModel } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  loginForm:FormGroup;
  isSubmitted=false;
  isLogin=false;
  errorMessage:any='';
  public openNav: boolean = false

  constructor(private modalService:NgbModal,
              private formBulider:FormBuilder,
              private userService:UserService,
              public toastService: ToastService,
              private router:Router
            ) { }

  ngOnInit(): void {
    this.initForm();
    this.isLogin=this.userService.isLogin;
  }
  openLoginModal(LoginModal) {
    this.modalService.open(LoginModal, { scrollable: true });
  }

  resetForm(form){form.reset()}

  onLogin(modal){
      let user=new login();
      user.email=this.loginForm.value.email;
      user.password=this.loginForm.value.password;
      this.userService.login(user).subscribe(
      res=>{
        if(res['user'] != null){
          this.toastSuccess(res['message']);
          localStorage.setItem("pm_user",JSON.stringify(res['user']));
          this.resetForm(this.loginForm);
          this.modalService.dismissAll();
          this.isLogin=true;
          this.userService.isLogin=true;
          let logUser=res['user'];
          if(logUser.admin===1){
            this.router.navigateByUrl('admin/products');
          }else{
            this.router.navigateByUrl('products');
          }
        }else{
          this.toastDanger(res['error']);
          this.isSubmitted=true;
          this.errorMessage=res['error'];
        }
        
      },
      error=>{
        error.error.error.forEach(element=>{this.toastDanger(element);});
      }
    );
  }

  private initForm(){
    this.loginForm=this.formBulider.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    });
  }

  toastSuccess(message) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  toastDanger(message) {
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: 5000 });
  }

  logout(){
    localStorage.removeItem("pm_user");
    this.isLogin=false;
  }

}
