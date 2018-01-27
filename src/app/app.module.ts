import { HomeService } from './home/home.service';
import { MenuItemService } from './shared/menu-item/menu-item.service';
import { SocialService } from './shared/social/social.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainBarComponent } from './shared/main-bar/main-bar.component';
import { MainBarService } from './shared/main-bar/main-bar.service';
import { PanelComponent } from './shared/panel/panel.component';
import { PanelService } from './shared/panel/panel.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CategoryService } from './shared/category/category.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    GalleryComponent,
    WelcomeComponent,
    MainBarComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    MainBarService,
    PanelService,
    SocialService,
    MenuItemService,
    HomeService,
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
