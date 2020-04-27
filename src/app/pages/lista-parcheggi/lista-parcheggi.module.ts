import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaParcheggiPage } from './lista-parcheggi.page';

const routes: Routes = [
  {
    path: '',
    component: ListaParcheggiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaParcheggiPage]
})
export class ListaParcheggiPageModule {}
