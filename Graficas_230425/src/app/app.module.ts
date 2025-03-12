import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { DrillDownComponent } from './drill-down/drill-down.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
     // Removed trailing comma
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }