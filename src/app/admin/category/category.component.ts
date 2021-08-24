import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { categoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories:categoryModel[];
  cat:any=null;
  catShow:any=null;
  catForm:FormGroup;
  updateForm:FormGroup;
  id=null;
  tempId=null;
  files:any;
  submitted=false
  apiUrl:any;

  constructor(private catSer:CategoryService,
              private modalService: NgbModal,
              public toastService: ToastService,
              private categoryService:CategoryService,
              private formBulider:FormBuilder
            ) {  }

  ngOnInit(): void {
    this.apiUrl=environment.apiUrl;
    this.catSer.allCategories.subscribe(res=>{
      this.categories=res;
    });
    this.initForm();
  }

  get f(){
    return this.catForm.controls;
  }

  uploadImage(event){
    this.files=event.target.files[0];
    console.log(this.files);
  }

  openAddCategoryModal(AddModal) {
      this.modalService.open(AddModal, { scrollable: true });
  }

  openUpdateCategoryModal(updateModal,id) {
    this.tempId=id;
      this.categories.forEach(el=>{
        if(id==el.id){
          this.cat=el;
        }
      });
      // this.updateForm.controls["name"].setValue(this.pro.name);
      this.catForm.patchValue({
        name:this.cat.name,
        desc:this.cat.desc
      });
      this.modalService.open(updateModal);
  }

  openForDeleteModal(deleteModal,id){
    this.modalService.open(deleteModal);
    this.tempId=id;
  }

  openShowCategoryModal(showModal,id) {
    this.tempId=id;
      this.categories.forEach(el=>{
        if(id==el.id){
          this.catShow=el;
        }
      });
      this.modalService.open(showModal);
  }

  search(input){
    this.catSer.getFromDb(input);
  }

  private initForm(){
    this.catForm=this.formBulider.group({
      name:['',[Validators.required]],
      desc:['',[Validators.required]],
      image:[null]
    });
  }


  onAddCategory(){
    this.submitted=true;
    if(this.catForm.invalid){
      return;
    }
    const formData=new FormData();
    formData.append("image",this.files,this.files.name);
    formData.append("name",this.catForm.value.name);
    formData.append("desc",this.catForm.value.desc);
    this.catSer.add(formData).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.modalService.dismissAll();
        this.catSer.getFromDb("");
        this.resetForm(this.catForm);
        this.submitted=false;
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );
  }


  update(){
    this.submitted=true;
    if(this.catForm.invalid){
      return;
    }
    const formData=new FormData();
    formData.append("id",this.tempId);
    if(this.catForm.value.image != null)
    {
      formData.append("image",this.files,this.files.name);
    }
    formData.append("name",this.catForm.value.name);
    formData.append("desc",this.catForm.value.desc);
    console.log("form data"+formData);
    this.catSer.update(formData).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.modalService.dismissAll();
        this.catSer.getFromDb("");
        this.resetForm(this.catForm);
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
    this.catSer.delete(this.tempId).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.catSer.getFromDb("");
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );
  }

  refreshData(){
    this.catSer.getFromDb("");
  }
}
