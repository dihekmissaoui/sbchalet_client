import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { IChalet } from 'src/app/model/chalet.model';
import { IReservation } from 'src/app/model/reservation.model';
import { SharedObjectService } from 'src/app/shared/shared-object.service';
import { WizardComponent as ArcWizardComponent } from 'angular-archwizard';
import { IUser } from 'src/app/model/user.model';
import { ReservationService } from 'src/app/shared/reservation.service';
import { DatesUtils } from 'src/app/utils/dates-utils';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {


  @ViewChild('formStep1') formStep1: NgForm;
  @ViewChild('formStep2') formStep2: NgForm;
  @ViewChild('formStep3') formStep3: NgForm;
  @ViewChild('wizard') wizard: ArcWizardComponent;

  posting = false;


  reservation: IReservation;
  chalet: IChalet;
  user: IUser = {};
  nbNuites:number;
  totalPrix: number=0;
  constructor(
    private sharedObjectService: SharedObjectService,
    private reservationService: ReservationService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.sharedObjectService.currentChalet.subscribe(res => {
      this.chalet = res;
    })
    this.sharedObjectService.currentReservation.subscribe(res => {
      this.reservation = res;
      this.reservation.chaletId = this.chalet.id;

      const dd = new Date(this.datePipe.transform(this.reservation.dateDeDebut, 'MM/dd/yyyy'));
      const df = new Date(this.datePipe.transform(this.reservation.dateDeDefin, 'MM/dd/yyyy'));
      this.nbNuites = DatesUtils.getDaysArray(dd, df).length;
      this.reservation.nbNuites = this.nbNuites;
      this.totalPrix = Number(this.nbNuites) * Number(this.chalet.prix);
      this.reservation.totalPrix = this.totalPrix;

      this.reservation.user = this.user;
  })
    console.log('chalet: ', this.chalet);
    console.log('reservation:', this.reservation);
}

onNextStep1() {
  this.user.nom = this.formStep1.controls.nom.value;
  this.user.prenom = this.formStep1.controls.prenom.value;
  this.user.email = this.formStep1.controls.email.value;
  this.user.username = this.user.email.split('@')[0];
  this.user.password = Math.random().toString(36).slice(-8);

  
  this.reservation.user = this.user;
  this.sharedObjectService.changeUser(this.user);

  this.formStep1.onSubmit(null);
  if (this.formStep1.valid) {
    this.wizard.goToNextStep();
  }
}

onNextStep2() {
  this.formStep2.onSubmit(null);
  if (this.formStep2.valid) {
    this.wizard.goToNextStep();
  }
}

onNextStep3() {
  // this.formStep3.onSubmit(null);
  // if (this.formStep3.valid) {
    this.posting = true;
    // setTimeout(() => {
      this.reservationService.save(this.reservation).subscribe(res=>{
        this.posting = false;
      });
    // }, 2000);
    this.wizard.goToNextStep();
  // }
}

}
