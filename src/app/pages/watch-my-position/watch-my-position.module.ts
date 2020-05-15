import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WatchMyPositionPage } from './watch-my-position.page';

const routes: Routes = [
  {
    path: '',
    component: WatchMyPositionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WatchMyPositionPage]
})
export class MyPositionPageModule {}
