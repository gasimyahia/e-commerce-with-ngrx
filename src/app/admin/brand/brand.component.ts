import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { brandModel } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:brandModel[];
  bra:any=null;
  braShow:any=null;
  brandForm:FormGroup;
  id=null;
  tempId=null;
  files:any;
  submitted=false
  apiUrl:any;

  constructor(private brandSer:BrandService,
              private modalService: NgbModal,
              public toastService: ToastService,
              private formBulider:FormBuilder
            ) {  }

  ngOnInit(): void {
    this.apiUrl=environment.apiUrl;
    this.brandSer.allBrands.subscribe(res=>{
      this.brands=res;
    });
    this.initForm();
  }

  get f(){
    return this.brandForm.controls;
  }

  uploadImage(event){
    this.files=event.target.files[0];
    console.log(this.files);
  }

  openAddBrandModal(AddModal) {
      this.modalService.open(AddModal, { scrollable: true });
  }

  openUpdateBrandModal(updateModal,id) {
    this.tempId=id;
      this.brands.forEach(el=>{
        if(id==el.id){
          this.bra=el;
        }
      });
      // this.updateForm.controls["name"].setValue(this.pro.name);
      this.brandForm.patchValue({
        name:this.bra.name,
        desc:this.bra.desc
      });
      this.modalService.open(updateModal);
  }

  openForDeleteModal(deleteModal,id){
    this.modalService.open(deleteModal);
    this.tempId=id;
  }

  openShowBrandModal(showModal,id) {
    this.tempId=id;
      this.brands.forEach(el=>{
        if(id==el.id){
          this.braShow=el;
        }
      });
      this.modalService.open(showModal);
  }

  search(input){
    this.brandSer.getFromDb(input);
  }

  private initForm(){
    this.brandForm=this.formBulider.group({
      name:['',[Validators.required]],
      desc:['',[Validators.required]],
      image:[null]
    });
  }


  onAddBrand(){
    this.submitted=true;
    if(this.brandForm.invalid){
      return;
    }
    const formData=new FormData();
    formData.append("image",this.files,this.files.name);
    formData.append("name",this.brandForm.value.name);
    formData.append("desc",this.brandForm.value.desc);
    this.brandSer.add(formData).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.modalService.dismissAll();
        this.brandSer.getFromDb("");
        this.resetForm(this.brandForm);
        this.submitted=false;
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );
  }


  update(){
    this.submitted=true;
    if(this.brandForm.invalid){
      return;
    }
    const formData=new FormData();
    formData.append("id",this.tempId);
    if(this.brandForm.value.image != null)
    {
      formData.append("image",this.files,this.files.name);
    }
    formData.append("name",this.brandForm.value.name);
    formData.append("desc",this.brandForm.value.desc);
    console.log("form data"+formData);
    this.brandSer.update(formData).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.modalService.dismissAll();
        this.brandSer.getFromDb("");
        this.resetForm(this.brandForm);
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
    console.log(this.tempId);
    this.brandSer.delete(this.tempId).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.brandSer.getFromDb("");
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );
  }

  refreshData(){
    this.brandSer.getFromDb("");
  }
}
