import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import {Lingua} from '../../services/lingua.service';
import {HomePopoverComponent} from './home-popover/home-popover.component';
import {Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private lingue: Lingua[];
  private utente: Utente;



  constructor(public popoverController: PopoverController,
              public utenteService: UtenteService,
              private navController: NavController) {}

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
  }


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

    listaparcheggi() {
    this.navController.navigateForward('lista-parcheggi');  }

    maps() {
    this.navController.navigateForward('maps');
    }

    research() {
      this.navController.navigateForward('research');
    }

    preferiti() {
    this.navController.navigateForward('/preferiti/' );
    }

}


