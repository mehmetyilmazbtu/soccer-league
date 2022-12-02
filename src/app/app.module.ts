import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {ButtonModule} from 'primeng/button'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { LayoutComponent } from './layout/layout.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
