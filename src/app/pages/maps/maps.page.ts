import {Component, OnInit} from '@angular/core';
import {Map, latLng, tileLayer, marker, control} from 'leaflet';
import * as L from 'leaflet';
import {Parcheggio} from '../../model/parcheggio.model';
import {Observable} from 'rxjs';
import {ParcheggioService} from '../../services/parcheggio.service';
import {NavController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-maps',
    templateUrl: 'maps.page.html',
    styleUrls: ['maps.page.scss'],
})
export class MapsPage implements OnInit {
    map: Map;
    newMarker: any;
    parkMarker: any;
    propertyList = [];
    private parcheggio$: Observable<Parcheggio[]>;
    private parcheggi: Parcheggio[];
    latitude: number;
    longitude: number;



    constructor(private parcheggioService: ParcheggioService,
                private navController: NavController,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.parcheggio$ = this.parcheggioService.list();
        this.initFilteredItems();
    }

    ionViewDidEnter() {
        this.route.queryParams.subscribe(params => {
            this.latitude = params.lat;
            this.longitude = params.long;
        });
        if (this.latitude && this.longitude != null) {
            this.map = new L.Map('mapId2', {zoomControl: false}).setView([this.latitude, this.longitude], 12);
        } else {
            this.map = new L.Map('mapId2', {zoomControl: false}).setView([42.5787392, 13.975551999999999], 7);
        }
        new L.Control.Zoom({position: 'bottomleft'}).addTo(this.map);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
        fetch('../../../assets/data.json').then(res => res.json())
            .then(json => {
                this.propertyList = json.properties;
                this.leafletMap();
            });
        const myIcon = L.icon({
            iconUrl: '../../../assets/CarPark.png',
            iconSize: [25, 41],
            iconAnchor: [25, 41],
            popupAnchor: [-12, -41],
            shadowUrl: '../../../assets/icon/marker-shadow.png',
            shadowSize: [20, 41],
            shadowAnchor: [20, 41],
        });
        this.parcheggio$.subscribe(data => {
            this.parcheggi = data;
            this.parcheggi.forEach(parcheggio => {
                this.parkMarker = L.marker([parcheggio.latitude, parcheggio.longitude], {icon: myIcon})
                    .addTo(this.map);
                this.parkMarker.on('click', () => {
                    this.navController.navigateForward('/parcheggio/' + parcheggio.id);
                });
            });
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
        const utenteicon = L.icon({
            iconUrl: '../../../assets/Omino.png',
            iconSize: [30, 60],
            iconAnchor: [30, 60],
            popupAnchor: [-15, -60],
            shadowUrl: '../../../assets/icon/marker-shadow.png',
            shadowSize: [30, 60],
            shadowAnchor: [30, 60],
        });
        // tslint:disable-next-line:no-shadowed-variable
        this.map.locate({setView: true}).on('locationfound', (e: any) => {
            const radius = e.accuracy;
            this.newMarker = L.marker([e.latitude, e.longitude], {icon: utenteicon}).addTo(this.map)
                .bindPopup('You are within' + radius + ' meters from this point').openPopup();
        });
    }
    research() {
        this.navController.navigateForward('research');
    }

    goBack() {
        this.navController.navigateBack('home');
    }
}
