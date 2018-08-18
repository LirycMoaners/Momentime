import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../shared/category/category.model';
import { CategoryService } from '../shared/category/category.service';
import { Email } from '../shared/email/email.model';
import { EmailService } from '../shared/email/email.service';
import { Anchor } from '../shared/anchor/anchor.model';
import { PageTextService } from '../shared/page-text/page-text.service';
import { PageText } from '../shared/page-text/page-text.model';
import { AppConfigService } from '../shared/app-config/app-config.service';
import { AppConfig } from '../shared/app-config/app-config.model';
import { AnchorService } from '../shared/anchor/anchor.service';
import { TestimonyService } from '../shared/testimony/testimony.service';

@Component({
  selector: 'mtc-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  public categories: Category[] = [];
  public email: Email = new Email();
  public mailMessage: string;
  public anchorList: Anchor[];
  public homeText: PageText;
  public appConfig: AppConfig;
  public testimonyList: string[];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private emailService: EmailService,
    private pageTextService: PageTextService,
    private appConfigService: AppConfigService,
    private anchorService: AnchorService,
    private testimonyService: TestimonyService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
    this.pageTextService.getText('home', 'fr').subscribe((pageText: PageText) => {
      this.homeText = pageText;
    });
    this.appConfigService.getAppConfig().subscribe((appConfig: AppConfig) => {
      this.appConfig = appConfig;
    });
    this.anchorService.getAnchorList('fr').subscribe((anchorList: Anchor[]) => {
      this.anchorList = anchorList;
    });
    this.testimonyService.getTestimonyList().subscribe((testimonyList: string[]) => {
      this.testimonyList = testimonyList;
    });
  }

  onAnchorClick(fragment: string) {
    setTimeout(() =>
      document.querySelector('#' + fragment).scrollIntoView({block: 'center', behavior: 'smooth'})
    );
  }

  navigateToGallery(category: Category) {
    this.router.navigate(['/gallery'], {queryParams: {'category': category.name}});
  }

  sendEmail() {
    if (this.email.from && this.email.subject && this.email.text && this.email.tel) {
      this.emailService.sendEmail(this.email).subscribe(() => {
        this.mailMessage = 'Message envoyé !';
        this.email = new Email();
      });
    } else {
      this.mailMessage = 'Merci de bien remplir tous les champs avant d\'envoyer votre message !';
    }
  }
}
