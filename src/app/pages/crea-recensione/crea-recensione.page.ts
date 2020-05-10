import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Recensione} from '../../model/recensione.model';
import {ModalController, NavParams} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {ParcheggioService} from '../../services/parcheggio.service';
import {ParamMap} from '@angular/router';

@Component({
  selector: 'app-crea-recensione',
  templateUrl: './crea-recensione.page.html',
  styleUrls: ['./crea-recensione.page.scss'],
})
export class CreaRecensionePage implements OnInit {

  private recensione: Recensione;
  private recensioneFormModel: FormGroup;
  rate: any;
  private idParcheggio: number;


  constructor(private formBuilder: FormBuilder,
              private utenteService: UtenteService,
              private parcheggioService: ParcheggioService,
              private modalController: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {
    this.recensione = this.navParams.data.appParam;
    this.recensioneFormModel = this.formBuilder.group({
      rate: [''],
      descrizione: [this.recensione.descrizione, Validators.compose([
        Validators.required
      ])],
      nome: [this.recensione.nome, Validators.compose([
        Validators.required
      ])],
    });
  }

  async onSubmit() {
    this.recensione.rating = this.recensioneFormModel.value.rate;
    this.recensione.utente = this.utenteService.getUtente().value;
    this.recensione.nome = this.recensioneFormModel.value.nome;
    this.recensione.descrizione = this.recensioneFormModel.value.descrizione;
    await this.modalController.dismiss(this.recensione);
  }

  async cancel() {
    await this.modalController.dismiss();
  }


}
