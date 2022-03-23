import { Component, OnInit } from '@angular/core';
import { HebrewCalendar, HDate, Location, Event, HebrewDateEvent, months, gematriya } from '@hebcal/core';
import { Month, MonthLeapYear, days } from '../month'

@Component({
  selector: 'app-new-calendar',
  templateUrl: './new-calendar.component.html',
  styleUrls: ['./new-calendar.component.css']
})
export class NewCalendarComponent {

  today = new HDate();
  thisMonth = this.today.getMonthName();
  thisYear = this.today.getFullYear();
  allDaysInMonth: any = [];
  gematriya = gematriya;
  month: Array<any> = [];
  years: Array<any> = []
  days: Array<any> = days;

  checkIsLeapYear(year: number) {
    let hdate = new HDate(1, 1, year);
    if (hdate.isLeapYear()) {
      return MonthLeapYear;
    } else {
      return Month;
    }
  }

  nextMonth() {
    if (this.today.getMonth() != 6 && this.today.getMonth() != HDate.monthsInYear(this.today.getFullYear())) {
      this.changeDate(this.today.getFullYear(), this.today.getMonth() + 1, 1)
    } else if (this.today.getMonth() == 6) {
      this.changeDate(this.today.getFullYear() + 1, 7, 1)
    } else {
      this.changeDate(this.today.getFullYear(), 1, 1)
    }
  }

  lastMonth() {
    if (this.today.getMonth() != 7 && this.today.getMonth() != 1) {
      this.changeDate(this.today.getFullYear(), this.today.getMonth() - 1, 1)
    } else if (this.today.getMonth() == 7) {
      this.changeDate(this.today.getFullYear() - 1, 6, 1)
    } else {
      this.changeDate(this.today.getFullYear(), HDate.monthsInYear(this.today.getFullYear()), 1)
    }
  }

  changeYear(e: any) {
    this.month = this.checkIsLeapYear(e.target.value);
  }

  changeDate(year: number, month: any, day: number) {
    this.allDaysInMonth = []

    this.today = new HDate(day, month, year);
    this.thisMonth = this.today.getMonthName();
    this.thisYear = this.today.getFullYear();
    let lenMonth = this.today.daysInMonth();

    for (let d = 0; d < lenMonth; d++) {
      let day = new HDate(d + 1, month, year);
      this.allDaysInMonth.push(day)
    }

    let theDayOnFirstDayInMonths = this.allDaysInMonth[0].getDay();
    for (; theDayOnFirstDayInMonths > 0; theDayOnFirstDayInMonths--) {
      this.allDaysInMonth.unshift(this.allDaysInMonth[0].prev())
    }

    let theDayOnLastDayInMonths = this.allDaysInMonth[this.allDaysInMonth.length - 1].getDay();
    for (; theDayOnLastDayInMonths < 6; theDayOnLastDayInMonths++) {
      this.allDaysInMonth.push(this.allDaysInMonth[this.allDaysInMonth.length - 1].next())
    }

    for (let y = this.today.getFullYear() - 20; y <= this.today.getFullYear() + 20; y++) {
      this.years.push(y)
    }

    this.month = this.checkIsLeapYear(this.today.getFullYear())

  }

  constructor() {
    let today = new HDate()
    this.changeDate(today.getFullYear(), today.getMonth(), today.getDay())
  }

}


