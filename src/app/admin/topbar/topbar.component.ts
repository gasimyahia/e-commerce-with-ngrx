import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  collapsed = true;
  isLogin=true;
  logUser:userModel;

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("pm_user") != null)
    {
      this.logUser=JSON.parse(localStorage.getItem("pm_user"));
      if(this.logUser.admin ==1)
      {
        this.isLogin=true;
      }else{
        this.router.navigateByUrl('/');
        this.isLogin=false;
      }
    }else{
      this.router.navigateByUrl('/');
      this.isLogin=false;
    };
  }

  logout(){
    localStorage.removeItem("pm_user");
    this.router.navigateByUrl('/');
  }

}
