import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { productModel } from '../../models/product.model';
import { productsModel } from 'src/app/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Products=new BehaviorSubject<productsModel[]>(null);;
  private baseURL="http://localhost:8000/api/";
  allProducts=new BehaviorSubject<productsModel[]>(null);

  constructor(private http:HttpClient) { this.getFromDb(""); }

  public add(form){
    return this.http.post(this.baseURL+"add",form);
  }

  public delete(id){
    return this.http.post(this.baseURL+"delete?id="+id,null);
  }

  public update(form){
    return this.http.post(this.baseURL+"update",form);
  }

  public getFromDb(keys){
    return this.http.post(this.baseURL+"show?keys="+keys,null).subscribe(res=>{
      var r:any=res;
      this.Products.next(r.products);
      //this.allProducts=this.Products;
      this.allProducts.next(r.products);
    });
  }

  getProductByCatId(categoryId?: number){
    this.Products.subscribe(res=>{
      let products=res;
      let filterdProduct=products.filter(product => product.brand_id == categoryId);
      this.allProducts.next(filterdProduct);
    })
  }

  getProductByBrandId(BrandId?: number){
    this.Products.subscribe(res=>{
      let products=res;
      let filterdProduct=products.filter(product => product.brand_id == BrandId);
      this.allProducts.next(filterdProduct);
    })
  }

  getAllProduct(){
    this.Products.subscribe(res=>{
      let products=res;
      this.allProducts.next(products);
    })
  }

 // fetch the product by category
  // getProductBy(categoryId?: number){
  //   let filterdProduct = this.allProducts.value.filter(product => product.cat_id == categoryId)
  //   this.allProducts.next(filterdProduct);
  // }

  
}
