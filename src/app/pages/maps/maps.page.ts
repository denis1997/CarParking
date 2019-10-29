import { Component } from '@angular/core';
import { Map, latLng, tileLayer, layer, marker} from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: 'maps.page.html',
  styleUrls: ['maps.page.scss']
})
export class MapsPage {
  map: Map;
  propertyList = [];

  ionViewDidEnter() {
    this.map = new Map('mapId2').setView([42.577655, 13.988621], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    fetch('../../../assets/data.json').then(res => res.json())
        .then(json => {
          this.propertyList = json.properties;
          this.leafletMap();
        });
  }

  leafletMap() {
    for (const property of this.propertyList) {
      marker([property.long, property.lat]).addTo(this.map)
          .bindPopup(property.city)
          .openPopup();
    }
    }
  ionViewWillLeave() {
    this.map.remove();
  }
}
