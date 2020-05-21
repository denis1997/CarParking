import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, of, pipe} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Parcheggio} from '../../model/parcheggio.model';
import {ParcheggioService} from '../../services/parcheggio.service';
import {UtenteService} from '../../services/utente.service';
import {AlertController, IonItemSliding, ModalController, NavController, ToastController} from '@ionic/angular';
import {Recensione} from '../../model/recensione.model';
import {OverlayEventDetail} from '@ionic/core';
import {CreaRecensionePage} from '../crea-recensione/crea-recensione.page';
import {Preferiti} from '../../model/preferiti.model';
import {Utente} from '../../model/utente.model';
import {tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-dettaglio-parcheggio',
  templateUrl: './dettaglio-parcheggio.page.html',
  styleUrls: ['./dettaglio-parcheggio.page.scss'],
})

@Component({
  selector: 'app-dettaglio-parcheggio',
  templateUrl: './dettaglio-parcheggio.page.html',
  styleUrls: ['./dettaglio-parcheggio.page.scss'],
})

export class DettaglioParcheggioPage implements OnInit {
    private parcheggio$: Observable<Parcheggio>;
    private recensioni$: Observable<Recensione[]>;
    private idParcheggio: number;
    private preferito: Preferiti;
    private utente$: BehaviorSubject<Utente>;
    private parcheggio: Parcheggio;
    private preferiti$: Observable<Preferiti[]>;
    private idUtente: number;




    constructor(private route: ActivatedRoute,
                private parcheggioService: ParcheggioService,
                private modalController: ModalController,
                private utenteService: UtenteService,
                private alertController: AlertController,
                private toastController: ToastController,
                private translateService: TranslateService,
                private navController: NavController) {
    }

    ngOnInit() {
        this.utente$ = this.utenteService.getUtente();
        this.idUtente = this.utente$.getValue().id;
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.parcheggio$ = this.parcheggioService.findById(parseInt(params.get('id'), 0));
        });
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.idParcheggio = parseInt(params.get('id'), 0);
            this.listRecensioni();
        });
        this.parcheggio$.subscribe((value) => {
            this.parcheggio = value;
        });
        this.preferito = new Preferiti();
    }

    logout() {
        this.utenteService.logout();
        this.navController.navigateRoot('home');
    }

    async createRecensione() {
        const recensione = new Recensione();
        recensione.parcheggio = new Parcheggio();
        recensione.parcheggio.id = this.idParcheggio;
        const modal = await this.modalController.create({
            component: CreaRecensionePage,
            componentProps: {appParam: recensione}
        });
        modal.onDidDismiss().then((detail: OverlayEventDetail) => {
            if (detail !== null && detail.data !== undefined) {
                this.parcheggioService.createRecensione(detail.data).subscribe(() => {
                    this.listRecensioni();
                });
            } else {
                console.log('cancel button pressed');
            }
        });

        await modal.present();
    }

    listRecensioni() {
        this.recensioni$ = this.parcheggioService.listRecensioni(this.idParcheggio);
    }

    createPreferito(): void {
        this.preferito.utente = this.utente$.getValue();
        this.preferito.parcheggio = this.parcheggio;
        this.parcheggioService.createPreferito(this.preferito).subscribe((nuovoPreferito: Preferiti) => {
            this.parcheggio.piaciuto = true;
            this.presentToastAggiunto();
        });
        }

    async presentToastAggiunto() {
        const toast = await this.toastController.create({
            message: 'Parcheggio aggiunto ai preferiti',
            duration: 3000
        });
        toast.present();
    }

    async presentToastNonAggiunto() {
        const toast = await this.toastController.create({
            message: 'Parcheggio non aggiunto ai preferiti',
            duration: 3000
        });
        toast.present();
    }

    doRefresh(event) {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.parcheggio$ = this.parcheggioService.findById(parseInt(params.get('id'), 0));
        });
        setTimeout(() => {
            event.target.complete();
        }, 3000);
    }

}
