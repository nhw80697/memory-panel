import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HDate, HebrewCalendar, Event, gematriya } from '@hebcal/core';
import { Month, MonthLeapYear, days } from '../month'

@Component({
  selector: 'app-new-calendar',
  templateUrl: './new-calendar.component.html',
  styleUrls: ['./new-calendar.component.css']
})
export class NewCalendarComponent {

  today = new HDate();
  thisMonth: string | undefined;
  thisYear = this.today.getFullYear();
  allDaysInMonth: any = [];
  gematriya = gematriya;
  hebrewCalendar = HebrewCalendar;
  event = Event;
  month: Array<any> = [];
  years: Array<any> = []
  days: Array<any> = days;
  flagsOfHolidays: Array<number> = [21, 524288, 2097168, 2097170, 256]
  dayShowInModal: any = {
    date: this.today,
    message: ""
  };

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

  changeDate(year: number, month: any, dayInMonth: number) {
    this.allDaysInMonth = []

    this.today = new HDate(dayInMonth, month, year);
    this.thisMonth = this.today.getMonthName();
    this.thisYear = this.today.getFullYear();
    let lenMonth = this.today.daysInMonth();

    for (let d = 0; d < lenMonth; d++) {
      let day = {
        date: new HDate(d + 1, month, year),
        message: localStorage.getItem(year + ',' + month + ',' + String(Number(d) + 1)),
        holiday: this.hebrewCalendar.getHolidaysOnDate(new HDate(d + 1, month, year))
      }
      if (day.holiday) {
        console.log(day.holiday[0].getDesc() + " --- " + day.holiday[0].getFlags())
        day.holiday = day.holiday.filter(holiday => this.flagsOfHolidays.includes(holiday.getFlags()))
      }
      this.allDaysInMonth.push(day)
    }

    let theDayOnFirstDayInMonths = this.allDaysInMonth[0].date.getDay();
    for (; theDayOnFirstDayInMonths > 0; theDayOnFirstDayInMonths--) {
      this.allDaysInMonth.unshift({ date: this.allDaysInMonth[0].date.prev(), message: "" })
    }

    let theDayOnLastDayInMonths = this.allDaysInMonth[this.allDaysInMonth.length - 1].date.getDay();
    for (; theDayOnLastDayInMonths < 6; theDayOnLastDayInMonths++) {
      this.allDaysInMonth.push({ date: this.allDaysInMonth[this.allDaysInMonth.length - 1].date.next(), message: "" })
    }

    for (let y = this.today.getFullYear() - 20; y <= this.today.getFullYear() + 20; y++) {
      this.years.push(y)
    }

    this.month = this.checkIsLeapYear(this.today.getFullYear())

  }

  onSaveMessage(day: any) {
    console.log(day);
    let stringDate = day.date.getFullYear() + ',' + day.date.getMonth() + ',' + day.date.getDate();
    localStorage.setItem(stringDate, day.message)
  }

  constructor(private router: Router) {
    let today = new HDate()
    this.changeDate(today.getFullYear(), today.getMonth(), today.getDate())

  }

}


