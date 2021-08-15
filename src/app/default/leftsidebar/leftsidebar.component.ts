import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { brandModel } from 'src/app/models/brand.model';
import { categoryModel } from 'src/app/models/category.model';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit {
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  categories:categoryModel[]=[];
  brands:brandModel[]=[];
  


  constructor(
    private proSer:ProductService,
    private categoryService:CategoryService,
    private brandService:BrandService,
    private route:ActivatedRoute,
    private router:Router,

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
  }

  getProductByCat(id)
  {
    this.proSer.getProductByCatId(id);
  }

  getProductByBrand(id){
    this.proSer.getProductByBrandId(id);
  }

  getAllProduct(){
    this.proSer.getAllProduct();
  }

}
