import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BsLocaleService, BsModalRef, BsModalService } from "ngx-bootstrap";
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from "ngx-gallery-9";
import { ChaletService } from "../services/chalet.service";
import { defineLocale } from "ngx-bootstrap/chronos";
import { frLocale } from "ngx-bootstrap/locale";
import { IChalet } from "src/app/model/chalet.model";
import { DatePipe } from "@angular/common";
import { Image } from "src/app/model/image.model";
import { ReservationService } from "src/app/shared/reservation.service";
import { IReservation } from "src/app/model/reservation.model";

@Component({
  selector: "app-detail-chalet",
  templateUrl: "./detail-chalet.component.html",
  styleUrls: ["./detail-chalet.component.scss"],
})
export class DetailChaletComponent implements OnInit {
  chalet: IChalet;
  images: string[];

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[] = [];
  maxDate = new Date();

  selectedStartDate: Date;
  selectedEndDate: Date;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  datesDisabled = [];
  minDate = new Date();

  reservationError = false;

  modalRef: BsModalRef;
  config = {
    animated: true
  };

  isLoading: boolean = false;


  constructor(
    private chaletService: ChaletService,
    private route: ActivatedRoute,
    private localeService: BsLocaleService,
    private reservationService: ReservationService,
    private datePipe: DatePipe,
    private modalService: BsModalService
  ) {
    this.initDateRangePicker();

    defineLocale("fr", frLocale);
    this.localeService.use("fr");
  }

  ngOnInit(): void {
    this.initDetailPage();
    this.initGalleryOptions();
  }

  initDateRangePicker() {

  }

  updateItems(): void { }

  initDetailPage() {
    this.isLoading = true;
    const id = this.route.snapshot.params?.id;

    this.chaletService.getById(id).subscribe((res: any) => {
      this.chalet = res;
      this.galleryImages = this.chalet.images.map((item: Image, index) => {
        return {
          small: `data:${item.fileType};base64,${item.data}`,
          medium: `data:${item.fileType};base64,${item.data}`,
          big: `data:${item.fileType};base64,${item.data}`,
          url: `data:${item.fileType};base64,${item.data}`,
        };
      });
      setTimeout(() => {
        this.chalet.reservations.forEach((item) => {
          const dd = item.dateDeDebut;
          const df = item.dateDeDefin;
          this.getDaysArray(dd, df).every((item) =>
            this.datesDisabled.push(item)
          );
        });
        this.isLoading = false;
      }, 1000);
    });
  }

  saveReservation(): void {


    const reservation: IReservation = {
      dateDeDebut: this.selectedStartDate,
      dateDeDefin: this.selectedEndDate,
      chalet: this.chalet
    }
    this.getDaysArray(this.selectedStartDate, this.selectedEndDate).every((item) =>
      this.datesDisabled.push(item)
    );
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
  onValueChange($event) {
    if ($event) {
      const datesArray = $event.toString().split(",");
      this.selectedStartDate = new Date(this.datePipe.transform(datesArray[0], 'MM/dd/yyyy'));
      this.selectedEndDate = new Date(this.datePipe.transform(datesArray[1], 'MM/dd/yyyy'));
      this.bsInlineRangeValue = $event;

      this.checkReservationError();


    }
  }
  checkReservationError() {
    const selectedDates = this.getDaysArray(this.selectedStartDate, this.selectedEndDate);

    console.log('selected Dates: ', selectedDates);
    console.log('disbaled dates:', this.datesDisabled);



    // this.reservationError = this.datesDisabled.some(s=> selectedDates.includes(s));

    selectedDates.forEach(selected => {
      this.datesDisabled.forEach(disabled => {
        const d = new Date(disabled);
        const s = new Date(selected);
        if (d.getFullYear() == s.getFullYear() && d.getMonth() == s.getMonth() && d.getDay() == s.getDay()) {
          this.reservationError = true;
        }
      })
    })
    console.log('this.reservationError', this.reservationError);
    if (this.reservationError) {
      this.resetSelectedDates();
      const modal = document.getElementById('modal');
      modal.click();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
    this.reservationError = false;
    this.bsInlineRangeValue = [];

    this.resetSelectedDates();
  }
  closeModal(): void {
    this.reservationError = false;
    this.bsInlineRangeValue = [];
    this.modalRef.hide();
    this.resetSelectedDates();
  }

  resetSelectedDates() {
    this.selectedStartDate = undefined;
    this.selectedEndDate = undefined;
  }
  private getDaysArray(s, e) {
    for (
      var a = [], d = new Date(s);
      d <= new Date(e);
      d.setDate(d.getDate() + 1)
    ) {
      a.push(new Date(d));
    }
    return a;
  }
}
