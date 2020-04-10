import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Account, UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginFormModel: FormGroup;
  private loginTitle: string;
  private loginSubTitle: string;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private translateService: TranslateService,
              private navController: NavController,
              private utenteService: UtenteService) {
  }

  ngOnInit() {
    this.loginFormModel = this.formBuilder.group({
      username: ['dendip', Validators.compose([
        Validators.required
      ])],
      password: ['password', Validators.compose([
        Validators.required
      ])]
    });
    this.initTranslate();
  }

  onLogin() {
    const account: Account = this.loginFormModel.value;
    this.utenteService.login(account).subscribe((utente: Utente) => {
          this.loginFormModel.reset();
          this.navController.navigateRoot('home');
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            console.error('login request error: ' + err.status);
            this.showLoginError();
          }
        });
  }

  async showLoginError() {
    const alert = await this.alertController.create({
      header: this.loginTitle,
      message: this.loginSubTitle,
      buttons: ['OK']
    });

    await alert.present();
  }


  private initTranslate() {
    this.translateService.get('LOGIN_ERROR_SUB_TITLE').subscribe((data) => {
      this.loginSubTitle = data;
    });
    this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data) => {
      this.loginTitle = data;
    });
  }

}
