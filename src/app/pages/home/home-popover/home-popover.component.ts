import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {IonItemSliding, NavController, PopoverController, ToastController} from '@ionic/angular';
import {Utente} from '../../../model/utente.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UtenteService} from '../../../services/utente.service';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {
    private utente: Utente;
    private array: number[];
    private positionFormModel: FormGroup;
  constructor(public toastController: ToastController,
              private popoverController: PopoverController,
              private navController: NavController,
              private utenteService: UtenteService,
              private formBuilder: FormBuilder, ) { }

  ngOnInit() {
      this.utenteService.getUtente().subscribe((utente) => {
          this.utente = utente;
      });
  }

  onLocateUser() {
    Geolocation.getCurrentPosition()
        .then((resp) => {
            this.utente.latitude = resp.coords.latitude;
            this.utente.longitude = resp.coords.longitude;
            this.utenteService.updatePosition(this.utente).subscribe((utente: Utente) => {
            });
            alert(this.utente.latitude + 'longitude' +
                    this.utente.longitude);
        }).catch((error) => {
        console.log('Error getting location', error);
    });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La tua posizione è stata salvata.',
      duration: 800,
      position: 'middle',
      color: 'dark',
    });
    toast.present();
  }

  maps() {
       this.navController.navigateForward('watch-my-position');
   }

  close() {
    this.popoverController.dismiss();
  }
}
