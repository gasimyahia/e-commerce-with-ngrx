import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { getCartItems } from '../cart/state/cart.selector';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit , OnDestroy{
  isLogin=false;
  errorMessage:any='';
  public openNav: boolean = false;
  itemAccount:number=0;
  subscription:Subscription

  constructor(
              public toastService: ToastService,
              public userService:UserService,
              private store:Store,
              private router:Router
            ) { }

  ngOnInit(): void {
    this.isLogin=this.userService.isAuthenticated();
    this.subscription=this.store.select(getCartItems).subscribe(data=>{
      if(data != null){
        this.itemAccount=data.length;
      }
    });
  }


  logout(){
    localStorage.removeItem("pm_user");
    this.isLogin=false;
    this.userService.setAuthenticated(this.isLogin);
  }


  //--------------script for toggle menu--------------

  menuToggle(){
    var menuItems=document.getElementById("menuItems");
    if(menuItems.style.maxHeight=="0px")
    {
        menuItems.style.maxHeight="200px";
    }else{
        menuItems.style.maxHeight="0px";
    }
 }

 toastSuccess(message) {
  this.toastService.show(message, { classname: 'bg-info text-light', delay: 5000 });
}

 openCart(){
   if(localStorage.getItem("pm_user")===null){
     this.toastSuccess("Please go to account and login/register and try it");
   }
    this.router.navigateByUrl('/cart');

 }

 ngOnDestroy(){
   this.subscription.unsubscribe();
 }


}
