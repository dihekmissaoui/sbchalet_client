import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { IChalet } from 'src/app/model/chalet.model';
import { ChaletService } from '../../chalet/services/chalet.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  chalets: IChalet[];

    // references the #calendar in the template
    @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: []
  };

  tab = [1,2,3]
  constructor(private chaletService: ChaletService){}
  ngOnInit(): void {
      this.chaletService.getAll().subscribe(res=>{
        this.chalets = res.content;
        console.log(this.chalets);
        let tab = []
        this.chalets.forEach(chalet => {
          chalet.reservations.forEach(reservation => {
            tab.push(
              { title: chalet.description, start: reservation.dateDeDebut, end: reservation.dateDeDefin, color: '#'+Math.floor(Math.random()*16777215).toString(16)},    
            )
          })
        })
        this.calendarOptions.events = [...tab];
      })
  }
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
    console.log(arg);
    
  }

  someMethod() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
  }


}
