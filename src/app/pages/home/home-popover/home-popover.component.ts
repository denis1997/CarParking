import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {IonItemSliding, NavController, PopoverController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {

  constructor(public toastController: ToastController,
              private popoverController: PopoverController,
              private navController: NavController) { }

  ngOnInit() {}

  onLocateUser() {
    Geolocation.getCurrentPosition()
        .then(
            (location) => {
              this.presentToast();
            }
        )
        .catch(
            (error) => console.log('An error occurred')
        );
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
       this.navController.navigateForward('maps');
   }

  close() {
    this.popoverController.dismiss();
  }
}
