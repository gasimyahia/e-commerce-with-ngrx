export class cartModel{
  id:number;
  name:string;
  price:number;
  image:string;
  quantity:number;
  constructor(id:number,name:string,price:number,image:string,quntaty:number){
    this.id=id;
    this.name=name;
    this.price=price;
    this.image=image;
   this.quantity=quntaty
  }
}
