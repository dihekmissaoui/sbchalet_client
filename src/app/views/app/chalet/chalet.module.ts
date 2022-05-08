import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule as FormsModuleAngular, ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { AccordionModule, BsDatepickerModule, BsDropdownModule, ModalModule, PaginationModule, RatingModule, TabsModule } from 'ngx-bootstrap';
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { ComponentsChartModule } from 'src/app/components/charts/components.charts.module';
import { FormsContainersModule } from 'src/app/containers/forms/forms.containers.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';
import { UiModalsContainersModule } from 'src/app/containers/ui/modals/ui.modals.containers.module';
import { ReservationService } from 'src/app/shared/reservation.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChaletRoutingModule } from './chalet-routing.module';
import { DetailChaletComponent } from './detail-chalet/detail-chalet.component';
import { ListChaletComponent } from './list-chalet/list-chalet.component';
import { AddChaletModalComponent } from './add-chalet-modal/add-chalet-modal.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';





@NgModule({
  declarations: [
    ListChaletComponent,
    DetailChaletComponent,
    AddChaletModalComponent,
  ],
  imports: [
    SharedModule,
    ChaletRoutingModule,
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

    // NgxGlideModule,
    NgxGalleryModule,
    BsDatepickerModule.forRoot(),
    UiModalsContainersModule,
    DropzoneModule

  ],
  providers: [DatePipe, ReservationService],
  exports: [DetailChaletComponent]
})
export class ChaletModule { }
