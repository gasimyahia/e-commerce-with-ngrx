import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';
import { CategoryService } from '../../services/category/category.service';
import { BrandService } from '../../services/brand/brand.service';
import { categoryModel } from '../../models/category.model';
import { brandModel } from '../../models/brand.model';
import { product } from '../../models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any[];
  categories:categoryModel[];
  names: any;
  brands:brandModel[];
  pro:any=null;
  proShow:any=null;
  productForm:FormGroup;
  updateForm:FormGroup;
  id=null;
  tempId=null;
  page:number=1;
  size:number=1;
  numElement:number=4;

  constructor(private proSer:ProductService,
              private modalService: NgbModal,
              public toastService: ToastService,
              private categoryService:CategoryService,
              private brandService:BrandService,
              private formBulider:FormBuilder
            ) {  }

  ngOnInit(): void {
    this.proSer.allProducts.subscribe(res=>{
      this.products=res;
    });
    this.initForm();
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories=data.categories;
    });
    this.brandService.getBrands().subscribe((data:any)=>{
      this.brands=data.brands;
    });

  }

  openAddProductModal(AddModal) {
      this.modalService.open(AddModal, { scrollable: true });
  }

  openUpdateProductModal(updateModal,id) {
    this.tempId=id;
      this.products.forEach(el=>{
        if(id==el.id){
          this.pro=el;
        }
      });
      // this.updateForm.controls["name"].setValue(this.pro.name);
      this.productForm.patchValue({
        name:this.pro.name,
        category:this.pro.cat_id,
        brand:this.pro.brand_id,
        desc:this.pro.desc,
        price:this.pro.price,
        image:null
      });
      this.modalService.open(updateModal);
  }
  
  openForDeleteModal(deleteModal,id){
    this.modalService.open(deleteModal);
    this.tempId=id;
  }

  openShowProductModal(showModal,id) {
    this.tempId=id;
      this.products.forEach(el=>{
        if(id==el.id){
          this.proShow=el;
        }
      });
      this.modalService.open(showModal);
  }

  search(input){
    this.proSer.getFromDb(input);
  }

  private initForm(){
    this.productForm=this.formBulider.group({
      name:['',[Validators.required]],
      category:[null,[Validators.required]],
      brand:[null,[Validators.required]],
      price:[null,[Validators.required]],
      desc:['',[Validators.required]],
      image:[''],
    });
  }


  onAddProduct(){
    let prod=new product();
    console.log(this.productForm.value);
    prod.name=this.productForm.value.name;
    prod.category=this.productForm.value.category;
    prod.brand=this.productForm.value.brand;
    prod.price=this.productForm.value.price;
    prod.desc=this.productForm.value.desc;
    prod.image=this.productForm.value.image;
    console.log(prod);
    this.proSer.add(prod).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.proSer.getFromDb("");
        this.resetForm(this.productForm);
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );
  }


  update(){
    let prod=new product();
    prod.id=this.tempId;
    prod.name=this.productForm.value.name;
    prod.category=this.productForm.value.category;
    prod.brand=this.productForm.value.brand;
    prod.price=this.productForm.value.price;
    prod.desc=this.productForm.value.desc;
    prod.image=this.productForm.value.image;
    console.log(prod);
    this.proSer.update(prod).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.proSer.getFromDb("");
        this.resetForm(this.productForm);
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );
  }

  toastSuccess(message) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  toastDanger(message) {
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: 5000 });
  }

  resetForm(form: FormGroup) {
		form.reset();
	}

  deleteConfrim(){
    this.proSer.delete(this.tempId).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.proSer.getFromDb("");
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );
  }

  refreshData(){
    this.proSer.getFromDb("");
  }

  PageChange(){}

}
