import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  files:any;
  imageForm:FormGroup;
  submitted=false;
  message:any;

  constructor(
    private toastr:ToastrService,
    private formBuilder:FormBuilder,
    private productService:ProductService
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.imageForm=this.formBuilder.group({
      image:[null,Validators.required]
    })
  }

  get f(){
    return this.imageForm.controls;
  }

  uploadImage(event){
    this.files=event.target.files[0];
    console.log(this.files);
  }
  onSubmit(){
    this.submitted=true;
    if(this.imageForm.invalid){
      return;
    }

    const formData=new FormData();
    formData.append("image",this.files,this.files.name);
    this.productService.uploadImage(formData).subscribe(res=>{
      this.message=res;
      if(this.message.message=true){
        this.toastr.success(JSON.stringify(this.message.message),'',{
          timeOut:5000,
          progressBar:true
        })
      }else{
        this.toastr.error(JSON.stringify(this.message.message),'',{
          timeOut:5000,
          progressBar:true
        })
      }
      this.submitted=false;
      this.imageForm.get('image').reset();
    });
  }

}
