import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  isLoadingReservation: boolean = false;
  pendingReservationsLength = 0;
  validatedReservationsLength = 0;
  partiallyPaidReservationsLength = 0;
  paidReservationsLength = 0;
  confirmedReservationsLength = 0;
  constructor(private reservationService: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.isLoadingReservation = true;
    this.reservationService.find().subscribe(res => {
      this.reservations = res;
      this.reservations = this.reservations.map(res => {
        return {
          id: res.id,
          dateDeDebut: res.dateDeDebut,
          dateDeDefin: res.dateDeDefin,
          chalet: res.chalet,
          nbNuites: res.nbNuites,
          totalPrix: res.totalPrix,
          user: res.user,
          nbAdultes: res.nbAdultes,
          nbEnfant: res.nbEnfant,
          nbAnimal: res.nbAnimal,
          status: res.status,
          colorStatus: this.getItemStatus(status),
        }
      })
      this.initSizeOfValidationByStatus();
      this.isLoadingReservation = false;
    })
  }
  initSizeOfValidationByStatus() {
    this.pendingReservationsLength = this.reservations.filter(x => x.status === 'PENDING').length;
    this.validatedReservationsLength = this.reservations.filter(x => x.status === 'VALIDATED').length;
    this.partiallyPaidReservationsLength = this.reservations.filter(x => x.status === 'PARIALLY_PAID').length;
    this.paidReservationsLength = this.reservations.filter(x => x.status === 'PAID').length;
    this.confirmedReservationsLength = this.reservations.filter(x => x.status === 'CONFIRMED').length;
  }
  getItemStatus(status: string): string {
    switch (status) {
      case "PENDING":
        return "primary"
      case "VALIDATED":
        return "secondary"
      case "PARIALY_PAID":
        return "warning"
      case "PAID":
        return "info"

      default:
        return "success"
    }
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
  goToDetail(id: number) {
    this.router.navigate([`/app/reservation/` + id]);
  }

}
