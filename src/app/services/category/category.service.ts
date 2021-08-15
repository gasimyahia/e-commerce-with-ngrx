import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { categoryModel } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseURL="http://localhost:8000/api/category/";
  allCategories=new BehaviorSubject<categoryModel[]>(null);

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
      this.allCategories.next(r.categories);
    });
  }

  getCategories(){
    return this.http.post(this.baseURL,null);
  }
}

