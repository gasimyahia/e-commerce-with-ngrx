import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./default/default.module').then((m)=>m.DefaultModule)
},
{
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule)
},
{
  path:'template',
  loadChildren:()=>import('./template/template.module').then((m)=>m.TemplateModule)
}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
