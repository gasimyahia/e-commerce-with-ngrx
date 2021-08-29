import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted=false
  isLogin=false;
  errorMessage:any='';

  constructor(private modalService:NgbModal,
              private formBulider:FormBuilder
             ) { }

  ngOnInit(): void {
    this.initForm();
  }

  get f(){
    return this.loginForm.controls;
  }

  openLoginModal(LoginModal)
  {this.modalService.open(LoginModal, { scrollable: true });}

  onLogin(){
    this.submitted=true;
    if(this.loginForm.invalid){
      return;
    }
  }

  toggleRegister(){
    document.getElementById("regForm").style.transform="translateX(0px)";
    document.getElementById("loginForm").style.transform="translateX(0px)";
    document.getElementById("indicator").style.transform="translateX(100px)";
  }

  toggleLogin(){
    document.getElementById("regForm").style.transform="translateX(300px)";
    document.getElementById("loginForm").style.transform="translateX(300px)";
    document.getElementById("indicator").style.transform="translateX(0px)";
  }

  private initForm(){
    this.loginForm=this.formBulider.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    });
  }


}
