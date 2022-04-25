import { Component, OnInit } from '@angular/core';
import { IChalet } from 'src/app/model/chalet.model';
import { IReservation } from 'src/app/model/reservation.model';
import { SharedObjectService } from 'src/app/shared/shared-object.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {

  reservation: IReservation;
  chalet: IChalet;

  constructor(
    private sharedObjectService: SharedObjectService
  ) { }

  ngOnInit(): void {
    this.sharedObjectService.currentChalet.subscribe(res=>{
      this.chalet = res;
    })
    this.sharedObjectService.currentReservation.subscribe(res=>{
      this.reservation = res;
    })
    console.log('chalet: ', this.chalet);
    console.log('reservation:', this.reservation);
    
    
  }

}
