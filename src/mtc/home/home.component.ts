import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../shared/category/category.model';
import { CategoryService } from '../shared/category/category.service';
import { Email } from '../shared/email/email.model';
import { EmailService } from '../shared/email/email.service';
import { Anchor } from '../shared/anchor/anchor.model';

@Component({
  selector: 'mtc-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  public categories: Category[] = [];
  public email: Email = new Email();
  public mailMessage: string;
  public anchorList: Anchor[] = [
    {name: 'Présentation', fragment: 'presentation'},
    {name: 'Galerie', fragment: 'portfolio'},
    {name: 'Offre', fragment: 'pricing'},
    {name: 'A Propos', fragment: 'about'},
    {name: 'Contact', fragment: 'contact'},
  ];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
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
