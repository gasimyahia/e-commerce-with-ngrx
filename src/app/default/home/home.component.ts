import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { brandModel } from 'src/app/models/brand.model';
import { categoryModel } from 'src/app/models/category.model';
import { productsModel } from 'src/app/models/products.model';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
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

}
