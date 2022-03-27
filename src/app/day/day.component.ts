import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { HDate, gematriya } from '@hebcal/core';
import { MonthService } from '../month.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnChanges {

  @Input() day = { date: new HDate(), message: "" };
  // @Output() editedDay = new EventEmitter();
  gematriya = gematriya;
  thisYear: any;
  thisMonth: any;
  thisDay: any;
  thisMessage: any;

  saveMessage() {
    // this.editedDay.emit(this.day)
  }


  constructor(private montheService: MonthService) { }

  ngOnChanges(): void {
    if (this.day) {
      this.thisYear = gematriya(this.day.date.getFullYear());;
      this.thisMonth = this.montheService.getHeMonthName(this.day.date.getMonthName(), this.day.date.getFullYear());
      this.thisDay = gematriya(this.day.date.getDate());
    }
  }

}
