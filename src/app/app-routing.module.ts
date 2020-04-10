import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/authguard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)},
  { path: 'maps', loadChildren: './pages/maps/maps.module#MapsPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivateChild: [AuthGuard]  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'profilo', loadChildren: './pages/profilo/profilo.module#ProfiloPageModule', canActivateChild: [AuthGuard]  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
