import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Parcheggio} from '../../model/parcheggio.model';
import {ParcheggioService} from '../../services/parcheggio.service';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-lista-parcheggi',
  templateUrl: './lista-parcheggi.page.html',
  styleUrls: ['./lista-parcheggi.page.scss'],
})
export class ListaParcheggiPage implements OnInit {
  private parcheggio$: Observable<Parcheggio[]>;
  private utente$: BehaviorSubject<Utente>;
  private idUtente: number;

  constructor(private parcheggioService: ParcheggioService,
              private navController: NavController,
              private utenteService: UtenteService) { }

  ngOnInit() {
    this.utente$ = this.utenteService.getUtente();
    this.idUtente = this.utente$.getValue().id;
    this.parcheggio$ = this.parcheggioService.list();
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('home');
  }

}
