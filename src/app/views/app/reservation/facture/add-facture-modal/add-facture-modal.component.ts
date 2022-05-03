import { Component, TemplateRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IFacture } from 'src/app/model/facture.model';
import { FactureService } from 'src/app/shared/facture.service';

@Component({
  selector: 'app-add-facture-modal',
  templateUrl: './add-facture-modal.component.html',
  styleUrls: ['./add-facture-modal.component.scss']
})
export class AddFactureModalComponent implements OnInit {
  @Input('montantTotal') montantTotal: number;
  @Input('resteTotalApayer') resteTotalApayer: number;
  
  @Output() savedFacture: EventEmitter<IFacture> = new EventEmitter<IFacture>();

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-right'
  };
  categories = [
    { label: 'Cakes', value: 'chocolate' },
    { label: 'Cupcakes', value: 'vanilla' },
    { label: 'Desserts', value: 'strawberry' }
  ];

  facture:IFacture
  isLoading = true;
  @ViewChild('template', { static: true }) template: TemplateRef<any>;

  constructor(private modalService: BsModalService, private factureService: FactureService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.facture={
      montant: 0,
      dateFacture: new Date(),
      reservationId: +this.route.snapshot.params?.id
    };
    setTimeout(() => {
        this.isLoading = false;
    }, 1500);
  }

  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }
  save() {
    this.factureService.save(this.facture).subscribe(response=>{
      console.log('res',response);
      this.modalRef.hide();
      this.savedFacture.emit(response);
    })
  }
}
