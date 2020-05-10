import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {UtenteService} from '../../services/utente.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {AlertController, IonItemSliding, ModalController, NavController} from '@ionic/angular';
import {Recensione} from '../../model/recensione.model';
import {OverlayEventDetail} from '@ionic/core';
import {TranslateService} from '@ngx-translate/core';
import {CreaRecensionePage} from '../crea-recensione/crea-recensione.page';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  private profiloFormModel: FormGroup;
  private utente: Utente;
  private recensioni$: Observable<Recensione[]>;
  private deleteTitle: string;
  private messageTitle: string;
  private deleteButton: string;
  private cancelButton: string;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private utenteService: UtenteService,
              private modalController: ModalController,
              private translateService: TranslateService,
              private navController: NavController) {
  }

  ngOnInit() {
    this.initTranslate();
    this.profiloFormModel = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
    });
    this.utenteService.getUtente().subscribe((utente) => {
      this.profiloFormModel.patchValue({email: utente.email});
      this.utente = utente;
    });
    this.listRecensioni();
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('home');
  }

  onSubmit(): void {
    this.utente.email = this.profiloFormModel.value.email;
    this.utente.telefono = this.profiloFormModel.value.telefono;
    this.utenteService.updateProfilo(this.utente).subscribe((nuovoUtente: Utente) => {
      this.navController.back();
    });
  }

  listRecensioni() {
    this.recensioni$ = this.utenteService.listRecensioni();
  }

  async updateRecensione(recensione: Recensione) {
    const modal = await this.modalController.create({
      component: CreaRecensionePage,
      componentProps: {appParam: recensione}
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null && detail.data !== undefined) {
        this.utenteService.updateRecensione(detail.data).subscribe(() => {
          this.listRecensioni();
        });
      } else {
        console.log('cancel button pressed');
      }
    });
    return await modal.present();
  }

  async deleteRecensione(recensione: Recensione) {
    const alert = await this.alertController.create({
      header: this.deleteTitle,
      message: this.messageTitle,
      buttons: [
        {
          text: this.cancelButton,
          handler: () => {
            console.log('Annulla clicked');
          }
        },
        {
          text: this.deleteButton,
          handler: () => {
            this.utenteService.deleteRecensione(recensione).subscribe(() => {
              this.listRecensioni();
            });

          }
        }
      ]
    });

    await alert.present();
  }

  initTranslate() {
    this.translateService.get('RECENSIONE_DELETE_TITLE').subscribe((data: string) => {
      this.deleteTitle = data;
    });
    this.translateService.get('RECENSIONE_DELETE_MESSAGE').subscribe((data: string) => {
      this.messageTitle = data;
    });
    this.translateService.get('DELETE_BUTTON').subscribe((data: string) => {
      this.deleteButton = data;
    });
    this.translateService.get('CANCEL_BUTTON').subscribe((data: string) => {
      this.cancelButton = data;
    });
  }

}
