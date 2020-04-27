import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Parcheggio} from '../../model/parcheggio.model';
import {ParcheggioService} from '../../services/parcheggio.service';
import {UtenteService} from '../../services/utente.service';
import {NavController} from '@ionic/angular';

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

    constructor(private route: ActivatedRoute,
                private parcheggioService: ParcheggioService,
                private utenteService: UtenteService,
                private navController: NavController) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.parcheggio$ = this.parcheggioService.findById(parseInt(params.get('id'), 0));
        });
    }

    logout() {
        this.utenteService.logout();
        this.navController.navigateRoot('home');
    }
}
