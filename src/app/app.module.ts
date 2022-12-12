import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {ButtonModule} from 'primeng/button'; 
import { EffectsModule } from '@ngrx/effects'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { LayoutComponent } from './layout/layout.component';
import { StoreModule } from '@ngrx/store';
import { tableReducer } from './layout/state/table.reducer';
import { TableEffects } from './layout/state/table.effects';

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
    StoreModule.forRoot({tables: tableReducer}),
    EffectsModule.forRoot([TableEffects])
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
