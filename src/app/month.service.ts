import { Injectable } from '@angular/core';
import { HDate } from '@hebcal/core';
import { Month, MonthLeapYear, days } from './month'

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  month: Array<any> = Month
  getHeMonthName(enName: string, year: number) {
    if (HDate.isLeapYear(year)) {
      this.month = MonthLeapYear
    }
    return this.month.find(m => m.en == enName).he;
  }
  constructor() { }
}
