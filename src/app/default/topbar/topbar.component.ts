import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isLogin=false;
  errorMessage:any='';
  public openNav: boolean = false;
  itemAccount:number=0;

  constructor(
              public toastService: ToastService,
              public userService:UserService,
              private cartService:CartService,
              private router:Router
            ) { }

  ngOnInit(): void {
    this.isLogin=this.userService.isAuthenticated();
    if(this.cartService.getCartItems != null){
      this.itemAccount=this.cartService.getCartItems.length;
    }
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


}
