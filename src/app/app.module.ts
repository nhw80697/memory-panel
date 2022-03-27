import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { NewCalendarComponent } from './new-calendar/new-calendar.component';
import { DayComponent } from './day/day.component';

const routes: Routes = [
  { path: '', component: NewCalendarComponent },
  { path: 'day', component: DayComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NewCalendarComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
