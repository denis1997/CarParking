import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/authguard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'maps', loadChildren: './pages/maps/maps.module#MapsPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule',
    canActivateChild: [AuthGuard]  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registrazione', loadChildren: './pages/registrazione/registrazione.module#RegistrazionePageModule' },
  { path: 'profilo', loadChildren: './pages/profilo/profilo.module#ProfiloPageModule',
    canActivateChild: [AuthGuard]  },
  { path: 'lista-parcheggi', loadChildren: './pages/lista-parcheggi/lista-parcheggi.module#ListaParcheggiPageModule',
    canActivateChild: [AuthGuard] },
  { path: 'parcheggio/:id', loadChildren: './pages/dettaglio-parcheggio/dettaglio-parcheggio.module#DettaglioParcheggioPageModule' ,
    canActivateChild: [AuthGuard]},
  { path: 'watch-my-position', loadChildren: './pages/watch-my-position/watch-my-position.module#MyPositionPageModule' ,
    canActivateChild: [AuthGuard] },
  { path: 'recensioni/:id', loadChildren: './pages/recensioni/recensioni.module#RecensioniPageModule' },
  { path: 'preferiti/:id', loadChildren: './pages/preferiti/preferiti.module#PreferitiPageModule' ,
    canActivateChild: [AuthGuard] },
  { path: 'research', loadChildren: './pages/research/research.module#ResearchPageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
