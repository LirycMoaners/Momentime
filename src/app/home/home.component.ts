import { HomeService } from './home.service';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { MainBarService } from '../shared/main-bar/main-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/category/category.model';
import { CategoryService } from '../shared/category/category.service';
import { Email } from '../shared/email/email.model';
import { EmailService } from '../shared/email/email.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})

export class HomeComponent implements OnInit {
  public categories: Category[] = [];
  public email: Email = new Email();
  isArrowHidden = true;
  fragment: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainBarService: MainBarService,
    private elRef: ElementRef,
    private categoryService: CategoryService,
    private emailService: EmailService,
    public homeService: HomeService
  ) { }

  ngOnInit() {
    this.mainBarService.modifyIsHidden(true);
    this.route.fragment.subscribe(
      (fragment: string) => {
        this.fragment = fragment;
      }
    );
    this.homeService.getEvent().subscribe(
      () => {
        this.onAnchorClick();
      }
    );

    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    const number = this.elRef.nativeElement.scrollTop;
    if (number >= 50) {
      this.mainBarService.modifyIsHidden(false);
      this.isArrowHidden = false;
    } else if (number < 50) {
      this.mainBarService.modifyIsHidden(true);
      this.isArrowHidden = true;
    }
  }

  onAnchorClick() {
    setTimeout(() =>
      document.querySelector('#' + this.fragment).scrollIntoView({block: 'center', behavior: 'smooth'})
    );
  }

  scrollTop() {
    document.getElementById('home-slider').scrollIntoView({block: 'start', behavior: 'smooth'});
  }

  navigateToGallery(category: Category) {
    this.router.navigate(['/gallery'], {queryParams: {'category': category.name}, skipLocationChange: true});
  }

  sendEmail() {
    if (this.email.from && this.email.subject && this.email.text && this.email.tel) {
      this.emailService.sendEmail(this.email)
        .subscribe((res: Response) => console.log(res.text));
    }
  }
}
