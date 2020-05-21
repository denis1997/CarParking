import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreferitiPage } from './preferiti.page';
import {StarRatingModule} from 'ionic4-star-rating';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: PreferitiPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        StarRatingModule,
        TranslateModule
    ],
  declarations: [PreferitiPage]
})
export class PreferitiPageModule {}
