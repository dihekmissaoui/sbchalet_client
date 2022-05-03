import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "ngx-gallery-9";
import { IChalet } from 'src/app/model/chalet.model';
import { IReservation } from 'src/app/model/reservation.model';
import { ReservationService } from 'src/app/shared/reservation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-reservation',
  templateUrl: './detail-reservation.component.html',
  styleUrls: ['./detail-reservation.component.scss']
})
export class DetailReservationComponent implements OnInit {

  reservation: IReservation;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  changeStatusButtonText: string;
  chalet: IChalet;

  config = {
    url: `${environment.serverUrl}/uploadMultiFiles`,
    thumbnailWidth: 160,
    // tslint:disable-next-line: max-line-length
    previewTemplate: '<div class="dz-preview dz-file-preview mb-3"><div class="d-flex flex-row "><div class="p-0 w-30 position-relative"><div class="dz-error-mark"><span><i></i></span></div><div class="dz-success-mark"><span><i></i></span></div><div class="preview-container"><img data-dz-thumbnail class="img-thumbnail border-0" /><i class="simple-icon-doc preview-icon" ></i></div></div><div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative"><div><span data-dz-name></span></div><div class="text-primary text-extra-small" data-dz-size /><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div><a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a></div>'
  };

  constructor(private reservationService: ReservationService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.reservationService.getById(this.route.snapshot.params?.id).subscribe(res => {
      this.reservation = res
      this.chalet = res.chalet;
      this.changeStatusButtonText = this.resolveChangeStatusButtonText(this.reservation);
    });
    this.initGalleryOptions();

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
    console.log(event);
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
  performUpload(){
    
  }
}
