import { Component, OnInit } from '@angular/core';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private lingue: Lingua[];
  private profiloFormModel: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private navController: NavController,
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

}
