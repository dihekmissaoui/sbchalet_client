import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailChaletComponent } from './detail-chalet/detail-chalet.component';
import { ListChaletComponent } from './list-chalet/list-chalet.component';


const routes: Routes = [
  {
    path: '', component: ListChaletComponent,
  },
  {
    path: ':id', component: DetailChaletComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChaletRoutingModule { }
