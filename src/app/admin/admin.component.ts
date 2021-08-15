import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userModel } from '../models/user.model';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css',
  '../../assets/fontawesome-free/css/all.css'
]
})
export class AdminComponent implements OnInit {
  logUser:userModel;
  isLogin=false;
  products:any;
  constructor(private router:Router,
              private route:ActivatedRoute,
              private proSer:ProductService
      ) {

    if(localStorage.getItem("pm_user") != null)
    {
      this.logUser=JSON.parse(localStorage.getItem("pm_user"));
      if(this.logUser.admin ==1)
      {
        this.isLogin=true;
      }else{
        this.router.navigateByUrl('/');
      }
    }else{
      this.router.navigateByUrl('/');
    };

  }

  ngOnInit(): void {
    // let ph="phone";
    // this.proSer.getProduct(1).subscribe((res:any)=>{
    //   this.products=res.products;
    //   console.log(this.products);
    // });
  }

}
