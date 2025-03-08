import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
  

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,GoogleMapsModule,
     IonicModule.forRoot(),
      AppRoutingModule,
    ],
  providers: [ 
    Geolocation,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
