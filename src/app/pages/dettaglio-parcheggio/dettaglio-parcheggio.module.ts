import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettaglioParcheggioPage } from './dettaglio-parcheggio.page';
import {TranslateModule} from '@ngx-translate/core';
import {IonicRatingModule} from 'ionic4-rating/dist';
import {StarRatingModule} from 'ionic4-star-rating';
import {CreaRecensionePageModule} from '../crea-recensione/crea-recensione.module';

const routes: Routes = [
  {
    path: '',
    component: DettaglioParcheggioPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicRatingModule,
        RouterModule.forChild(routes),
        TranslateModule,
        CreaRecensionePageModule,
        ReactiveFormsModule,
        StarRatingModule
    ],
  declarations: [DettaglioParcheggioPage]
})
export class DettaglioParcheggioPageModule {}
