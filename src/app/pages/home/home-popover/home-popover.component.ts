import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {IonItemSliding, NavController, PopoverController, ToastController} from '@ionic/angular';
import {Utente} from '../../../model/utente.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UtenteService} from '../../../services/utente.service';
import {Observable} from 'rxjs';
import {Recensione} from '../../../model/recensione.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {
    private utente: Utente;
    private array: number[];
    private positionFormModel: FormGroup;
    private nonsalvata: string;
    private salvata: string;

    constructor(public toastController: ToastController,
                private translateService: TranslateService,
                private popoverController: PopoverController,
                private navController: NavController,
                private utenteService: UtenteService,
                private formBuilder: FormBuilder,) {
    }

    ngOnInit() {
        this.utenteService.getUtente().subscribe((utente) => {
            this.utente = utente;
        });
        this.initTranslate();
    }

    onLocateUser() {
        Geolocation.getCurrentPosition()
            .then((resp) => {
                this.utente.latitude = resp.coords.latitude;
                this.utente.longitude = resp.coords.longitude;
                this.utenteService.updatePosition(this.utente).subscribe((utente: Utente) => {
                    this.presentToast();
                    console.log(this.utente.id);
                });
            }).catch((error) => {
            console.log('Error getting location', error);
            this.errorToast();
        });
    }


    async presentToast() {
        const toast = await this.toastController.create({
            message: this.salvata,
            duration: 1000,
            position: 'middle',
            color: 'dark',
        });
        toast.present();
    }

    async errorToast() {
        const errtoast = await this.toastController.create({
            message: this.nonsalvata,
            duration: 1300,
            position: 'middle',
            color: 'dark',
        });
        errtoast.present();
    }

    maps() {
        this.navController.navigateForward('watch-my-position');
    }

    close() {
        this.popoverController.dismiss();
    }

    initTranslate() {
        this.translateService.get('POSIZIONE_SALVATA').subscribe((data: string) => {
            this.salvata = data;
        });
        this.translateService.get('POSIZIONE_NON_SALVATA').subscribe((data: string) => {
            this.nonsalvata = data;
        });
    }
}
