import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLogin=false;
  private baseURL="http://localhost:8000/api/user/";
  allUsers=new BehaviorSubject<userModel[]>(null);

  constructor(private http:HttpClient)
  {
    if(localStorage.getItem("pm_user") != null)
    {
      this.isLogin=true;
    }
  }

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
      this.allUsers.next(r.users);
    });
  }

  public login(form){
    return this.http.post(this.baseURL+"login",form);
  }

  getCategories(){
    return this.http.post(this.baseURL,null);
  }

  isAuthenticated(){
    return this.isLogin;
  }
  setAuthenticated(key){
     this.isLogin=key;
  }
}
