import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {UtenteService} from '../../services/utente.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {ActionSheetController, AlertController, IonItemSliding, ModalController, NavController} from '@ionic/angular';
import {Recensione} from '../../model/recensione.model';
import {OverlayEventDetail} from '@ionic/core';
import {TranslateService} from '@ngx-translate/core';
import {CreaRecensionePage} from '../crea-recensione/crea-recensione.page';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  private profiloFormModel: FormGroup;
  private utente: Utente;
  private recensioni$: Observable<Recensione[]>;
  private deleteTitle: string;
  private messageTitle: string;
  private deleteButton: string;
  private cancelButton: string;
  private utente$: BehaviorSubject<Utente>;
  private galleria: string;
  private fotocamera: string;
  private cancella: string;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private utenteService: UtenteService,
              private modalController: ModalController,
              private translateService: TranslateService,
              private camera: Camera,
              public actionSheetController: ActionSheetController,
              private file: File,
              private navController: NavController) {
  }

  ngOnInit() {
    this.utente$ = this.utenteService.getUtente();
    this.initTranslate();
    this.profiloFormModel = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
    });
    this.utenteService.getUtente().subscribe((utente) => {
      this.profiloFormModel.patchValue({email: utente.email});
      this.utente = utente;
    });
    this.listRecensioni();
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('home');
  }

  listRecensioni() {
    this.recensioni$ = this.utenteService.listRecensioni();
  }

  async updateRecensione(recensione: Recensione) {
    const modal = await this.modalController.create({
      component: CreaRecensionePage,
      componentProps: {appParam: recensione}
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null && detail.data !== undefined) {
        this.utenteService.updateRecensione(detail.data).subscribe(() => {
          this.listRecensioni();
        });
      } else {
        console.log('cancel button pressed');
      }
    });
    return await modal.present();
  }

  async deleteRecensione(recensione: Recensione) {
    const alert = await this.alertController.create({
      header: this.deleteTitle,
      message: this.messageTitle,
      buttons: [
        {
          text: this.cancelButton,
          handler: () => {
            console.log('Annulla clicked');
          }
        },
        {
          text: this.deleteButton,
          handler: () => {
            this.utenteService.deleteRecensione(recensione).subscribe(() => {
              this.listRecensioni();
            });

          }
        }
      ]
    });

    await alert.present();
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.utente.immagineProfilo = imageData;
      this.utenteService.updateProfilo(this.utente).subscribe((nuovoUtente: Utente) => {
      });
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: this.galleria,
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
        {
          text: this.fotocamera,
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: this.cancella,
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();

  }

  averageRating(recensioni: Recensione[] ) {
    if (recensioni.length === 0) { return  0; }
    let tot = 0;
    for (const r of recensioni ) {
      tot += r.rating;
    }
    return tot / recensioni.length;
  }

  initTranslate() {
    this.translateService.get('RECENSIONE_DELETE_TITLE').subscribe((data: string) => {
      this.deleteTitle = data;
    });
    this.translateService.get('RECENSIONE_DELETE_MESSAGE').subscribe((data: string) => {
      this.messageTitle = data;
    });
    this.translateService.get('DELETE_BUTTON').subscribe((data: string) => {
      this.deleteButton = data;
    });
    this.translateService.get('CANCEL_BUTTON').subscribe((data: string) => {
      this.cancelButton = data;
    });
    this.translateService.get('GALLERIA').subscribe((data: string) => {
      this.galleria = data;
    });
    this.translateService.get('FOTOCAMERA').subscribe((data: string) => {
      this.fotocamera = data;
    });
    this.translateService.get('CANCELLA').subscribe((data: string) => {
      this.cancella = data;
    });
  }

}
