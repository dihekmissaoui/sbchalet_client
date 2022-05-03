import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { DetailReservationComponent } from './detail-reservation/detail-reservation.component';
import { ListReservationComponent } from './list-reservation/list-reservation.component';


const routes: Routes = [
  {
    path: '', component: ListReservationComponent
  },
  {
    path: 'new', component: AddReservationComponent
  },
  {
    path: ':id', component: DetailReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
