import { NgModule } from '@angular/core';
import { FormsModule as FormsModuleAngular, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { HotkeyModule } from 'angular2-hotkeys';
import { AccordionModule, BsDropdownModule, ModalModule, PaginationModule, RatingModule, TabsModule } from 'ngx-bootstrap';
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





@NgModule({
  declarations: [AddReservationComponent],
  imports: [
    ReservationRoutingModule,
    SharedModule,
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

    ArchwizardModule
  ]
})
export class ReservationModule { }
