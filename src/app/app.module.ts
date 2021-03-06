import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {IonicStorageModule} from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {PlacesService} from './services/places.service';
import {FormsModule} from '@angular/forms';
import {httpInterceptorProviders} from './interceptors';
import {StarRatingModule} from 'ionic4-star-rating';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            HttpClientModule,
            FormsModule,
            StarRatingModule,
            IonicModule.forRoot(),
            IonicStorageModule.forRoot(),
            TranslateModule.forRoot({
               loader: {
                 provide: TranslateLoader,
                 useFactory: (createTranslateLoader),
                 deps: [HttpClient]
               }
            }),
            IonicStorageModule.forRoot({
              name: 'carparking__db',
              driverOrder: ['indexeddb', 'sqlite', 'websql']
            }),
            AppRoutingModule,
  ],
  providers: [
    StatusBar,
      EmailComposer,
    SplashScreen,
      Camera,
      File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      PlacesService,
      Storage,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
