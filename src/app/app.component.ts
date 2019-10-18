import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {LinguaService} from './services/lingua.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private linguaService: LinguaService,
    private translate: TranslateService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.initTranslate();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    const linguaPreferita = this.linguaService.getLinguaPreferita();
    this.translate.setDefaultLang(linguaPreferita);
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
      if (lingua != null) {
        this.translate.use(lingua);
      } else {
        this.translate.use(linguaPreferita);
        this.linguaService.updateLingua(linguaPreferita);
      }
    });
  }
}
