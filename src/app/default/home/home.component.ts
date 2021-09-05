import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { brandModel } from 'src/app/models/brand.model';
import { cartModel } from 'src/app/models/cart.model';
import { categoryModel } from 'src/app/models/category.model';
import { productsModel } from 'src/app/models/products.model';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories:categoryModel[]=[];
  brands:brandModel[]=[];
  allProducts: productsModel[];
  apiUrl:any;


  constructor(
    private proSer:ProductService,
    private categoryService:CategoryService,
    private brandService:BrandService,
    private cartService:CartService,
    public toastService: ToastService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories=data.categories;
    });

    this.brandService.getBrands().subscribe((data:any)=>{
      this.brands=data.brands;
    });
    this.proSer.allProducts.subscribe(res=>{
      this.allProducts=res;
     });
    this.apiUrl=environment.apiUrl;
  }

  ProductDetails(id: any) {
    this.router.navigate([`/products/${id}`]);
  }

  addToCart(product:productsModel){
    let cartItem=new cartModel(product.id,product.name,product.price,product.imgpath,1);
    this.cartService.addCartItems(cartItem);
    this.toastSuccess("Product added to Cart Successfuly");
  }

  toastSuccess(message) {
    this.toastService.show(message, { classname: 'bg-info text-light', delay: 5000 });
  }

}
