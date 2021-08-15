import { Injectable } from '@angular/core';
import { brandModel } from '../../models/brand.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseURL="http://localhost:8000/api/brand/";
  allBrands=new BehaviorSubject<brandModel[]>(null);
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
      this.allBrands.next(r.brands);
    });
  }

  getBrands(){
    return this.http.post(this.baseURL,null);
  }
}
