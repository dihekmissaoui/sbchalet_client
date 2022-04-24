import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { AddReservationComponent } from './add/add-reservation/add-reservation.component';


@NgModule({
  declarations: [AddReservationComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule { }
