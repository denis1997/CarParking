import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Parcheggio} from '../../model/parcheggio.model';
import {ParcheggioService} from '../../services/parcheggio.service';

@Component({
  selector: 'app-lista-parcheggi',
  templateUrl: './lista-parcheggi.page.html',
  styleUrls: ['./lista-parcheggi.page.scss'],
})
export class ListaParcheggiPage implements OnInit {
  private parcheggio$: Observable<Parcheggio[]>;

  constructor(private parcheggioService: ParcheggioService) { }

  ngOnInit() {
    this.parcheggio$ = this.parcheggioService.list();

  }

}
