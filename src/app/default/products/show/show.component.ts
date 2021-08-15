import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  products:any[];
  id:number;
  allProducts:any[];

  constructor(
              private proSer:ProductService,
              private route:ActivatedRoute
             ) {}
  ngOnInit(): void {
    //this.getProduct();
  }

  // getProduct(){
  //   this.proSer.allProducts.subscribe(res=>{
  //     this.allProducts=res;
  //     //console.log(this.allProducts);
  //   });
  //   this.route.params.subscribe(
  //     (params:Params)=>{
  //       this.id=+params['id'];
  //     }
  //   );
  //     // this.proSer.getProduct(this.id).subscribe((res:any)=>{
  //     //   //this.products=res.products;
        
  //     //   console.log(this.products);
  //     // });
      
  // }

  filterProducts (id,totalProduct){
    this.products=totalProduct.filter(p => p.cat_id == id);
    console.log(this.products);
  }

}
