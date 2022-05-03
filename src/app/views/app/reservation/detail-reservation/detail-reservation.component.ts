import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions
} from "ngx-gallery-9";
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { IChalet } from 'src/app/model/chalet.model';
import { Image } from 'src/app/model/image.model';
import { IReservation } from 'src/app/model/reservation.model';
import { ReservationService } from 'src/app/shared/reservation.service';
import { environment } from 'src/environments/environment';
import { AddFactureModalComponent } from '../facture/add-facture-modal/add-facture-modal.component';

@Component({
  selector: 'app-detail-reservation',
  templateUrl: './detail-reservation.component.html',
  styleUrls: ['./detail-reservation.component.scss']
})
export class DetailReservationComponent implements OnInit {
  @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddFactureModalComponent;
  
  carouselSettings= {
    gap: 0,
    type: 'carousel',
    peek: { before: 50, after: 50 },
    perView: 3,
    breakpoints: { '600': { perView: 1 }, '1000': { perView: 2 } }
  };
  reservation: IReservation;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  changeStatusButtonText: string;
  chalet: IChalet;
  // ${environment.serverUrl}/uploadMultiFiles?elementId=${this.route.snapshot.params?.id}&partOf=reservation
  config: DropzoneConfigInterface = {

    url: `${environment.serverUrl}/uploadFile?elementId=${this.route.snapshot.params?.id}&partOf=reservation`,
    thumbnailWidth: 160,
    // tslint:disable-next-line: max-line-length
    previewTemplate: '<div class="dz-preview dz-file-preview mb-3"><div class="d-flex flex-row "><div class="p-0 w-30 position-relative"><div class="dz-error-mark"><span><i></i></span></div><div class="dz-success-mark"><span><i></i></span></div><div class="preview-container"><img data-dz-thumbnail class="img-thumbnail border-0" /><i class="simple-icon-doc preview-icon" ></i></div></div><div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative"><div><span data-dz-name></span></div><div class="text-primary text-extra-small" data-dz-size /><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div><a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a></div>'

  };
  album: IAlbum[];
  columns = [
    { prop: 'dateFacture' },
    { name: 'montant' },
  ];
  columnMode = ColumnMode.flex;
  rows;
  sommePaye =0;
  resteTotalApayer: number;
  constructor(private reservationService: ReservationService, private lightbox: Lightbox,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.initReservationDetail(this.route.snapshot.params?.id);
    this.initGalleryOptions();
    
  }
  initReservationDetail(id) {
    this.reservationService.getById(id).subscribe(res => {
      this.reservation = res
      this.chalet = res.chalet;
      this.changeStatusButtonText = this.resolveChangeStatusButtonText(this.reservation);
      this.rows =  this.reservation.factures;
      this.sommePaye = this.reservation.factures.reduce((n, {montant}) => n + montant, 0);
      this.reservation.resteTotalApayer = this.reservation.totalPrix - this.sommePaye
      this.album = this.reservation.files.map((item: Image, index) => {
        return {
          src: `${item.fileName}`,
          // caption: `data:${item.fileType};base64,${item.data}`,
          thumb: `data:${item.fileType};base64,${item.data}`,
        };
      });
    });
  }
  resolveChangeStatusButtonText(reservation: IReservation): string {
    switch (reservation.status) {
      case "PENDING":
        return "Valider";
      case "VALIDATED" || "PARIALLY_PAID":
        return "Compléter le payment";
      case "PARIALLY_PAID":
        return "Compléter le payment";
      case "PAID":
        return "Confirmé";
    }
  }
  ChangeStatus() {

    const toBeUpdated: IReservation = {
      id: this.reservation.id,
      status: this.nextStatusResolver(this.reservation.status),
    }
    this.reservationService.patch(this.reservation.id, toBeUpdated).subscribe(res => {
      this.reservation.status = res.status;
      this.changeStatusButtonText = this.resolveChangeStatusButtonText(this.reservation);
      console.log('update: ', res);

    })
  }
  nextStatusResolver(status: string): string {
    switch (status) {
      case "PENDING":
        return "VALIDATED";
      case "VALIDATED":
        return "PARIALLY_PAID";
      case "PARIALLY_PAID":
        return "PAID";
      case "PAID":
        return "CONFIRMED";
    }
  }

  onUploadError(event) {
    console.log(event);
  }

  onUploadSuccess(event) {
    this.initReservationDetail(this.route.snapshot.params?.id);
  }
  initGalleryOptions() {
    this.galleryOptions = [
      {
        width: "600px",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageArrows: true,
        fullWidth: true,
      },
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      {
        breakpoint: 400,
        preview: false,
      },
    ];
  }
  performUpload() {

  }

  openLightbox(index: number): void {
    this.lightbox.open(this.album, index, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }
  showAddNewModal() {
    this.addNewModalRef.show();
  }
  getSavedFacture($event): void {
    this.initReservationDetail(this.route.snapshot.params?.id);
    this.reservation.factures.push($event);
  }
}
