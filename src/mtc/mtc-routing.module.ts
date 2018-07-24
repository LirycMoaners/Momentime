import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    data: { state: 'welcome' }
  },
  {
    path: 'accueil',
    component: HomeComponent,
    data: { state: 'home' }
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { state: 'gallery' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class MtcRoutingModule { }
