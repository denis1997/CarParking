import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, layer, marker} from 'leaflet';
import * as L from 'leaflet';
import {forEach} from '@angular-devkit/schematics';
import {Parcheggio} from '../../model/parcheggio.model';
import {of} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {NavController, PopoverController, ToastController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';

@Component({
  selector: 'app-my-position',
  templateUrl: './watch-my-position.page.html',
  styleUrls: ['./watch-my-position.page.scss'],
})
export class WatchMyPositionPage implements OnInit {
  map: Map;
  newMarker: any;
  propertyList = [];
  private utente: Utente;

  constructor(private utenteService: UtenteService) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
  }

  ionViewDidEnter() {
    this.map = new Map('myPosition', { zoomControl: false }).setView([this.utente.latitude, this.utente.longitude], 30);
    new L.Control.Zoom({ position: 'topright' }).addTo(this.map);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    fetch('../../../assets/data.json').then(res => res.json())
        .then(json => {
          this.propertyList = json.properties;
          this.leafletMap();
        });
  }

  leafletMap() {
      L.marker([ this.utente.latitude, this.utente.longitude]).addTo(this.map).bindPopup('Your car is here').openPopup();
    // tslint:disable-next-line:only-arrow-functions prefer-const
      function onError(error) {
      alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    }
  }
  ionViewWillLeave() {
    this.map.remove();
  }

  locatePosition() {
    // tslint:disable-next-line:no-shadowed-variable
    this.map.locate({setView: true}).on('locationfound', (e: any) => {
      const radius = e.accuracy;
      this.newMarker = L.marker([e.latitude, e.longitude], +
          // tslint:disable-next-line:max-line-length
          {enableHighAccuracy: true, watch: true}).addTo(this.map).bindPopup('You are within' + radius + ' meters from this point').openPopup();
      L.circle([e.latitude, e.longitude], radius).addTo(this.map);
    });
  }
}
