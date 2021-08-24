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
import { environment } from 'src/environments/environment';


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
  collectionSize:number=0;
  numElement:number=4;
  files:any;
  submitted=false
  apiUrl:any;

  constructor(private proSer:ProductService,
              private modalService: NgbModal,
              public toastService: ToastService,
              private categoryService:CategoryService,
              private brandService:BrandService,
              private formBulider:FormBuilder
            ) {  }

  ngOnInit(): void {
    this.apiUrl=environment.apiUrl;
    this.proSer.allProducts.subscribe(res=>{
      this.products=res;
    });
    if(this.products !=null){
      this.collectionSize=this.products.length;
    }
    this.initForm();
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories=data.categories;
    });
    this.brandService.getBrands().subscribe((data:any)=>{
      this.brands=data.brands;
    });

  }

  get f(){
    return this.productForm.controls;
  }

  uploadImage(event){
    this.files=event.target.files[0];
    console.log(this.files);
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
      image:[null],
    });
  }


  onAddProduct(){
    this.submitted=true;
    if(this.productForm.invalid){
      return;
    }
    const formData=new FormData();
    formData.append("image",this.files,this.files.name);
    formData.append("name",this.productForm.value.name);
    formData.append("category",this.productForm.value.category);
    formData.append("brand",this.productForm.value.brand);
    formData.append("desc",this.productForm.value.desc);
    formData.append("price",this.productForm.value.price);
    this.proSer.add(formData).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.modalService.dismissAll();
        this.proSer.getFromDb("");
        this.resetForm(this.productForm);
        this.submitted=false;
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );
  }


  update(){
    this.submitted=true;
    if(this.productForm.invalid){
      return;
    }
    const formData=new FormData();
    formData.append("id",this.tempId);
    if(this.productForm.value.image != null)
    {
      formData.append("image",this.files,this.files.name);
    }
    formData.append("name",this.productForm.value.name);
    formData.append("category",this.productForm.value.category);
    formData.append("brand",this.productForm.value.brand);
    formData.append("desc",this.productForm.value.desc);
    formData.append("price",this.productForm.value.price);
    this.proSer.update(formData).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.modalService.dismissAll();
        this.proSer.getFromDb("");
        this.resetForm(this.productForm);
        this.submitted=false;
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


export function toFormData<T>( formValue: T ) {
  const formData = new FormData();
  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }
  return formData;
}
