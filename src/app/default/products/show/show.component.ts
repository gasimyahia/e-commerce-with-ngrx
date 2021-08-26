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

}
