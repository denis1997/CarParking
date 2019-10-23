import { Component } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';

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

    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    }).addTo(this.map);
    const markPoint = marker([42.5764200, 13.9889900]);
    markPoint.bindPopup('<p>ATRI</p>');
    this.map.addLayer(markPoint);
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}
