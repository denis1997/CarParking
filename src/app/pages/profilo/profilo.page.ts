import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lingua, LinguaService} from '../../services/lingua.service';
import {UtenteService} from '../../services/utente.service';
import {BehaviorSubject} from 'rxjs';
import {Utente} from '../../model/utente.model';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  private profiloFormModel: FormGroup;
  private utente: Utente;

  constructor(private formBuilder: FormBuilder,
              private utenteService: UtenteService,
              private navController: NavController) {
  }

  ngOnInit() {
    this.profiloFormModel = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
    });
    this.utenteService.getUtente().subscribe((utente) => {
      this.profiloFormModel.patchValue({email: utente.email});
      this.utente = utente;
    });
  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('login');
  }
}
