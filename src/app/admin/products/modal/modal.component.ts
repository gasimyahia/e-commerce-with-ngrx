import { Component, OnInit, Input } from '@angular/core';
import { productModel } from '../../../models/product.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() public product;

  //@Input() product:{name:string,category:string,brand:string,price:number,desc:string,image:string};
  productForm:FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.product);
  }

  private initForm(){
    let proName='';
    let proCategory='';
    let proBrand='';
    let proPrice='';
    let proDesc='';
    let proImage='';

    this.productForm=new FormGroup({
      'name':new FormControl(proName,Validators.required),
      'category':new FormControl(proCategory,Validators.required),
      'brand':new FormControl(proBrand,Validators.required),
      'price':new FormControl(proPrice,Validators.required),
      'desc':new FormControl(proDesc),
      'image':new FormControl(proImage)
    });
  }

  update(){}

}
