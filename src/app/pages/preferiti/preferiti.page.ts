import { Component, OnInit } from '@angular/core';
import {Preferiti} from '../../model/preferiti.model';
import {Utente} from '../../model/utente.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, IonCard, IonItemSliding, IonList, NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {ParcheggioService} from '../../services/parcheggio.service';
import {tap} from 'rxjs/operators';
import {Recensione} from '../../model/recensione.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.page.html',
  styleUrls: ['./preferiti.page.scss'],
})
export class PreferitiPage implements OnInit {

  private preferiti$: Observable<Preferiti[]>;
  private utente$: BehaviorSubject<Utente>;
  private idUtente: number;
  private deleteTitle: string;
  private messageTitle: string;
  private deleteButton: string;
  private cancelButton: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertCtrl: AlertController,
              private route: ActivatedRoute,
              private parcheggioService: ParcheggioService,
              private translateService: TranslateService,
              private navController: NavController,
              private alertController: AlertController,
              private utenteService: UtenteService) {
  }

  ngOnInit() {
    this.initTranslate();
    this.utente$ = this.utenteService.getUtente();
    this.idUtente = this.utente$.getValue().id;
    this.preferiti$ = this.parcheggioService.listPreferitiByIdUtente(this.idUtente);

  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('home');
  }

  listPreferiti() {
    this.preferiti$ = this.parcheggioService.listPreferiti(this.idUtente);
  }

  async deletePreferito(preferiti: Preferiti) {
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
            this.parcheggioService.deletePreferito(preferiti).subscribe(() => {
              this.listPreferiti();
            });

          }
        }
      ]
    });
    await alert.present();
  }

    initTranslate() {
      this.translateService.get('PREFERITI_DELETE_TITLE').subscribe((data: string) => {
        this.deleteTitle = data;
      });
      this.translateService.get('PREFERITI_DELETE_MESSAGE').subscribe((data: string) => {
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
