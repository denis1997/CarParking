import { Component, OnInit } from '@angular/core';
import {control, Map, tileLayer} from 'leaflet';
import * as L from 'leaflet';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import zoom = control.zoom;

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
    this.map = new L.Map('myPosition', { zoomControl: false }).setView([this.utente.latitude, this.utente.longitude], 14);
    new L.Control.Zoom({ position: 'topright' }).addTo(this.map);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    fetch('../../../assets/data.json').then(res => res.json())
        .then(json => {
          this.propertyList = json.properties;
          this.leafletMap();
        });
  }
  leafletMap() {
    const myIcon = L.icon({
      iconUrl: '../../../assets/car.png',
      iconSize: [30, 30],
      iconAnchor: [30, 30],
      popupAnchor: [-15, -30],
    });
    L.marker([ this.utente.latitude, this.utente.longitude], {icon: myIcon}).addTo(this.map).bindPopup('Your car is here').openPopup();
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
    const utenteicon = L.icon({
      iconUrl: '../../../assets/Omino.png',
      iconSize: [30, 60],
      iconAnchor: [30, 60],
      popupAnchor: [-15, -60],
      shadowUrl: '../../../assets/icon/marker-shadow.png',
      shadowSize: [30, 60],
      shadowAnchor: [30, 60],
    });
    this.map.locate({setView: true}).on('locationfound', (e: any) => {
      const radius = e.accuracy;
      this.newMarker = L.marker([e.latitude, e.longitude], {icon: utenteicon})
          .addTo(this.map).bindPopup('You are within' + radius + ' meters from this point').openPopup();
    });
  }
}
