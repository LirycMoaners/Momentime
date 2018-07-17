import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    data: { animation: 'welcome' }
  },
  {
    path: 'accueil',
    component: HomeComponent,
    data: { animation: 'home' }
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { animation: 'home' }
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
export class AppRoutingModule { }
