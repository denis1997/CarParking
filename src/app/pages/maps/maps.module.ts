import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';

import { IonicModule } from '@ionic/angular';

import { MapsPage } from './maps.page';

const routes: Routes = [
  {
    path: '',
    component: MapsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
