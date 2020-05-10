import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaRecensionePage } from './crea-recensione.page';
import {TranslateModule} from '@ngx-translate/core';
import {IonicRatingModule} from 'ionic4-rating/dist';

@NgModule({
  entryComponents: [CreaRecensionePage],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    IonicRatingModule,
    IonicModule,
  ],
  declarations: [CreaRecensionePage]
})
export class CreaRecensionePageModule {}
