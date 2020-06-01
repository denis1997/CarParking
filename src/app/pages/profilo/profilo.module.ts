import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ProfiloPage} from './profilo.page';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../../app.module';
import {StarRatingModule} from 'ionic4-star-rating';
import {CreaRecensionePageModule} from '../crea-recensione/crea-recensione.module';


const routes: Routes = [
  {
    path: '',
    component: ProfiloPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CreaRecensionePageModule,
        IonicModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        RouterModule.forChild(routes),
        StarRatingModule
    ],
  declarations: [ProfiloPage]
})
export class ProfiloPageModule {
}
