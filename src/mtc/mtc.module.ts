import { MenuItemService } from './shared/menu-item/menu-item.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MtcRoutingModule } from './mtc-routing.module';
import { MtcComponent } from './mtc.component';
import { HomeComponent } from './home/home.component';
import { MainBarComponent } from './shared/main-bar/main-bar.component';
import { PanelComponent } from './shared/panel/panel.component';
import { PanelService } from './shared/panel/panel.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CategoryService } from './shared/category/category.service';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './shared/app-config/app-config.service';
import { HttpService } from './shared/http/http.service';
import { EmailService } from './shared/email/email.service';
import { PageTextService } from './shared/page-text/page-text.service';
import { AnchorService } from './shared/anchor/anchor.service';
import { TestimonyService } from './shared/testimony/testimony.service';

@NgModule({
  declarations: [
    MtcComponent,
    HomeComponent,
    GalleryComponent,
    WelcomeComponent,
    MainBarComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MtcRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PanelService,
    MenuItemService,
    AppConfigService,
    HttpService,
    CategoryService,
    EmailService,
    PageTextService,
    AnchorService,
    TestimonyService
  ],
  bootstrap: [MtcComponent]
})
export class MtcModule { }
