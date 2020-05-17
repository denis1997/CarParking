import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Recensione} from '../../model/recensione.model';
import {Parcheggio} from '../../model/parcheggio.model';
import {ParcheggioService} from '../../services/parcheggio.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UtenteService} from '../../services/utente.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.page.html',
  styleUrls: ['./recensioni.page.scss'],
})
export class RecensioniPage implements OnInit {

  private recensioni$: Observable<Recensione[]>;
  private idParcheggio: number;
  private parcheggio$: Observable<Parcheggio>;

  constructor(private parcheggioService: ParcheggioService,
              private utenteService: UtenteService,
              private navController: NavController,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idParcheggio = parseInt(params.get('id'), 0);
      this.listRecensioni();
    });
  }


  listRecensioni() {
    this.recensioni$ = this.parcheggioService.listRecensioni(this.idParcheggio);
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('home');
  }
}
