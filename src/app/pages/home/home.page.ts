import { Component } from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import {Lingua} from '../../services/lingua.service';
import {HomePopoverComponent} from './home-popover/home-popover.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private lingue: Lingua[];


  constructor(public popoverController: PopoverController,
              private navController: NavController) {}

  async notifications() {
    const popover = await this.popoverController.create({
      component: HomePopoverComponent,
      translucent: true,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

    myaccount() {
      this.navController.navigateForward('profilo');    }

  settings() {
    this.navController.navigateForward('settings');    }
}


