import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { DataService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { RecordLabelComponent } from './record-label/record-label.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecordLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
