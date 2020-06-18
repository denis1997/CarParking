import {Component, OnInit} from '@angular/core';
import {Map, latLng, tileLayer, marker, control} from 'leaflet';
import * as L from 'leaflet';
import {Parcheggio} from '../../model/parcheggio.model';
import {Observable} from 'rxjs';
import {ParcheggioService} from '../../services/parcheggio.service';
import {NavController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';


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
    private token1;
    private token2;


    constructor(private parcheggioService: ParcheggioService,
                private translateService: TranslateService,
                private navController: NavController,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.initTranslate();
        this.parcheggio$ = this.parcheggioService.list();
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
                .bindPopup(this.token1 + radius + this.token2).openPopup();
        });
    }

    research() {
        this.navController.navigateForward('research');
    }

    goBack() {
        this.navController.navigateBack('home');
    }

    initTranslate() {
        this.translateService.get('TOKEN1').subscribe((data: string) => {
            this.token1 = data;
        });
        this.translateService.get('TOKEN2').subscribe((data: string) => {
            this.token2 = data;
        });
    }
}
