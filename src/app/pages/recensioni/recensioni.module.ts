import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecensioniPage } from './recensioni.page';
import {StarRatingModule} from 'ionic4-star-rating';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: RecensioniPage
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
  declarations: [RecensioniPage]
})
export class RecensioniPageModule {}
