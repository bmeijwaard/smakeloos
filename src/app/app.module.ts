import { CardsService } from './cards/cards.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [CardsService, FirebaseMessaging, StatusBar, BarcodeScanner, SplashScreen, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: 'BASE_URL',
      useFactory: getBaseUrl
    }],
  bootstrap: [AppComponent]
})
export class AppModule {}


export function getBaseUrl(): string {
  return environment.baseUrl;
}
