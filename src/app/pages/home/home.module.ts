import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';


import { HomePage } from './home.page';
import {TranslateModule} from '@ngx-translate/core';
import {HomePopoverComponent} from './home-popover/home-popover.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        TranslateModule
    ],
    entryComponents: [HomePopoverComponent],
  declarations: [HomePage, HomePopoverComponent]
})
export class HomePageModule {}
