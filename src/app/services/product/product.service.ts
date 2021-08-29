import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { productsModel } from 'src/app/models/products.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Products=new BehaviorSubject<productsModel[]>(null);;
  private baseURL=environment.apiUrl+"/api/";
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

  public getProductById(keys){
    return this.http.post(this.baseURL+"single-product?keys="+keys,null);
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

 uploadImage(data){
   const headers=new HttpHeaders();
   return this.http.post(this.baseURL+"file",data,{
     headers:headers
   });
 }


}
