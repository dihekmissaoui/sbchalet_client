import { Component, OnInit } from '@angular/core';
import { IReservation } from 'src/app/model/reservation.model';
import { ReservationService } from 'src/app/shared/reservation.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit {
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'sales', name: 'Sales' },
    { prop: 'stock', name: 'Stock' },
    { prop: 'category', name: 'Category' },
    { prop: 'id', name: 'Id' }
  ];
  itemsPerPage = 10;
  itemOptionsPerPage = [5, 10, 20];
  itemOrder = 'Title';
  itemOptionsOrders = ['Title', 'Category', 'Status', 'Label'];
  
  selectAllState = '';
  selected = [];
  surveyItems: any[] = [];
  displayOptionsCollapsed = false;


  reservations: IReservation[];

  isLoadingReservation:boolean = false;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.isLoadingReservation = true;
    // setTimeout(() => {
      
      this.reservationService.find().subscribe(res=>{
        this.reservations = res;
        this.isLoadingReservation= false;
        console.log('res:', res);
        
      })
    // }, 5000);
      
  
  }

  selectAll($event) {
    if ($event.target.checked) {
      this.selected = [...this.surveyItems];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }
  setSelectAllState() {
    if (this.selected.length === this.surveyItems.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }
  isSelected(p: any) {
    return this.selected.findIndex(x => x.id === p.id) > -1;
  }

  onSelect(item: any) {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  
}
