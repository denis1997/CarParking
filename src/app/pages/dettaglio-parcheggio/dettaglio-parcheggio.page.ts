import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Parcheggio} from '../../model/parcheggio.model';
import {ParcheggioService} from '../../services/parcheggio.service';
import {UtenteService} from '../../services/utente.service';
import {IonItemSliding, ModalController, NavController} from '@ionic/angular';
import {Recensione} from '../../model/recensione.model';
import {OverlayEventDetail} from '@ionic/core';
import {CreaRecensionePage} from '../crea-recensione/crea-recensione.page';


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
    private parcheggio: Parcheggio;
    private recensioni: Recensione;


    constructor(private route: ActivatedRoute,
                private parcheggioService: ParcheggioService,
                private modalController: ModalController,
                private utenteService: UtenteService,
                private navController: NavController) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.parcheggio$ = this.parcheggioService.findById(parseInt(params.get('id'), 0));
        });
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.idParcheggio = parseInt(params.get('id'), 0);
            this.listRecensioni();
        });
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

}
