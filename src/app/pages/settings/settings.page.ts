import { Component, OnInit } from '@angular/core';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  body: '';
  private lingue: Lingua[];
  private profiloFormModel: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private navController: NavController,
              private emailComposer: EmailComposer,
              private translateService: TranslateService,
              private utenteService: UtenteService,
              private linguaService: LinguaService) {
  }


  ngOnInit() {
    this.lingue = this.linguaService.getLingue();
    this.profiloFormModel = this.formBuilder.group({
      linguaPreferita: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.linguaService.getLinguaAttuale().subscribe((lingua) => {
      this.profiloFormModel.patchValue({linguaPreferita: lingua});
    });
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('home');
  }

  onSubmit(): void {
    this.translateService.use(this.profiloFormModel.value.linguaPreferita);
    this.linguaService.updateLingua(this.profiloFormModel.value.linguaPreferita);
    this.navController.back();
  }
  cancel() {
    this.navController.back();
  }


  send() {
  const email = {
  to: 'denisdipatrizio4@gmail.com',
    subject: 'Parcheggio Segnalato',
    body: this.body,
    cc: [],
    bcc: [],
    attachments: [],
    isHtml: true
  };
  this.emailComposer.open(email);

  this.emailComposer.addAlias('gmail', 'com.google.android.gm');
}

}
