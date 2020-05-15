import {Component, OnInit} from '@angular/core';
import { Map, latLng, tileLayer, layer, marker} from 'leaflet';
import * as L from 'leaflet';
import {mark} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';
import {Parcheggio} from '../../model/parcheggio.model';
import {Observable} from 'rxjs';
import {ParcheggioService} from '../../services/parcheggio.service';
import {forEach} from '@angular-devkit/schematics';
@Component({
  selector: 'app-maps',
  templateUrl: 'maps.page.html',
  styleUrls: ['maps.page.scss'],
})
export class MapsPage implements OnInit {
  map: Map;
  newMarker: any;
  propertyList = [];
  private parcheggio$: Observable<Parcheggio[]>;

    constructor(private parcheggioService: ParcheggioService) { }

    ngOnInit() {
        this.parcheggio$ = this.parcheggioService.list();

    }


  ionViewDidEnter() {
    this.map = new Map('mapId2', { zoomControl: false }).setView([42.5787392, 13.975551999999999], 30);
    new L.Control.Zoom({ position: 'bottomleft' }).addTo(this.map);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    fetch('../../../assets/data.json').then(res => res.json())
        .then(json => {
          this.propertyList = json.properties;
          this.leafletMap();
        });
  }

  leafletMap() {
    // tslint:disable-next-line:max-line-length
    // const myPosition = navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});
    //  L.marker([latitute , longitude]).addTo(this.map);
      // L.marker([42.5879 , 13.98]).addTo(this.map);
      // L.marker([42.5873 , 13.98]).addTo(this.map);
      // L.marker([42.5875 , 13.98]).addTo(this.map);
    // onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
// onError Callback receives a PositionError object
//
      // onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
      // tslint:disable-next-line:only-arrow-functions prefer-const
    function onSuccess(position) {
          alert('Latitude: '          + position.coords.latitude        + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
      }

// onError Callback receives a PositionError object
//
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
