import { DatePipe } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule as FormsModuleAngular, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { HotkeyModule } from 'angular2-hotkeys';
import { AccordionModule, BsDropdownModule, CollapseModule, ModalModule, PaginationModule, ProgressbarModule, RatingModule, TabsModule } from 'ngx-bootstrap';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { ComponentsChartModule } from 'src/app/components/charts/components.charts.module';
import { FormsContainersModule } from 'src/app/containers/forms/forms.containers.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { ListReservationComponent } from './list-reservation/list-reservation.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { DetailReservationComponent } from './detail-reservation/detail-reservation.component';
import { ChaletModule } from '../chalet/chalet.module';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { AddFactureModalComponent } from './facture/add-facture-modal/add-facture-modal.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';




@NgModule({
  declarations: [
    AddReservationComponent,
    ListReservationComponent,
    DetailReservationComponent,
    AddFactureModalComponent
  ],
  imports: [
    NgxDatatableModule,
    SharedModule,
    ReservationRoutingModule,
    ComponentsCarouselModule,
    LayoutContainersModule,
    PagesContainersModule,
    ComponentsCardsModule,
    ComponentsChartModule,
    RatingModule,
    FormsModuleAngular,
    FormsContainersModule,
    ReactiveFormsModule,
    HotkeyModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),

    CollapseModule.forRoot(),
    SortablejsModule,
    ProgressbarModule.forRoot(),
    ArchwizardModule,
    NgxGalleryModule,
    ChaletModule,
    DropzoneModule,
    SortablejsModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }

  ]
})
export class ReservationModule { }
