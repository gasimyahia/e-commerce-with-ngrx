import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { categoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ToastService } from 'src/app/services/toast/toast.service';

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

  constructor(private catSer:CategoryService,
              private modalService: NgbModal,
              public toastService: ToastService,
              private categoryService:CategoryService,
              private formBulider:FormBuilder
            ) {  }

  ngOnInit(): void {
    this.catSer.allCategories.subscribe(res=>{
      this.categories=res;
    });
    this.initForm();
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
      desc:['',[Validators.required]]
    });
  }


  onAddCategory(){
    let cate=new categoryModel();
    console.log(this.catForm.value);
    cate.name=this.catForm.value.name;
    cate.desc=this.catForm.value.desc;
    this.catSer.add(cate).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.catSer.getFromDb("");
        this.resetForm(this.catForm);
      },
      error=>{error.error.error.forEach(element=>{this.toastDanger(element);});}
    );
  }


  update(){
    let prod=new categoryModel();
    prod.id=this.tempId;
    prod.name=this.catForm.value.name;
    prod.desc=this.catForm.value.desc;
    this.catSer.update(prod).subscribe(
      res=>{
        this.toastSuccess(res['message']);
        this.catSer.getFromDb("");
        this.resetForm(this.catForm);
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
