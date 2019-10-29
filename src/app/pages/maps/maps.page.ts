import { Component } from '@angular/core';
import { Map, latLng, tileLayer, layer, marker} from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: 'maps.page.html',
  styleUrls: ['maps.page.scss']
})
export class MapsPage {
  map: Map;

  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    this.map = new Map('mapId2').setView([42.5764200, 13.9889900], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    const marks = marker([42.5764200, 13.9889900]).addTo(this.map);
    }

  ionViewWillLeave() {
    this.map.remove();
  }

}
