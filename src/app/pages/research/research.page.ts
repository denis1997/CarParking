import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Parcheggio} from '../../model/parcheggio.model';
import {ParcheggioService} from '../../services/parcheggio.service';
import {NavController} from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {NavigationExtras} from '@angular/router';
import {Preferiti} from '../../model/preferiti.model';
import {UtenteService} from '../../services/utente.service';



@Component({
  selector: 'app-research',
  templateUrl: './research.page.html',
  styleUrls: ['./research.page.scss'],
})
export class ResearchPage implements OnInit {
  private parcheggio$: Observable<Parcheggio[]>;
  public searchControl: FormControl;
  private ricerca = '';
  private cittaselezionata: string;




  constructor(private parcheggioService: ParcheggioService,
              private utenteService: UtenteService,
              private navController: NavController, ) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.parcheggio$ = this.parcheggioService.list();
  }

  maps(lat, long) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        lat,
        long
      }
    };
    this.navController.navigateForward('maps', navigationExtras);
  }

  parcheggioRicercato(nome) {
    this.parcheggioService.creaRicerche(nome).subscribe((nuovaRicerca: Parcheggio) => {
    });
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('home');
  }

  resetCitta() {
    this.cittaselezionata = '';
  }

}
