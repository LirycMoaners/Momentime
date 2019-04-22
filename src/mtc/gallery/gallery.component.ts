import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../shared/category/category.service';
import { Category } from '../shared/category/category.model';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'mtc-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  public categories: Category[] = [];
  public showedCategory: Category = null;
  public bigPicture: SafeUrl;
  allCategoriesVisible = true;
  picturesUrl: string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;

      this.showedCategory = this.categories
        .find((category: Category) => category.name === this.route.snapshot.queryParams['category']) || null;
      if (this.showedCategory) {
        this.switchCategoryVisibility(this.showedCategory);
      }
    });
  }

  public switchCategoryVisibility(category: Category) {
    this.showedCategory = category;
    for (const cat of this.categories) {
      if (this.showedCategory.name === cat.name) {
        cat.isShown = true;
      } else {
        cat.isShown = false;
      }
    }
  }

  public onClickPicture(picture: SafeUrl) {
    this.bigPicture = picture;
  }

  public closePicture() {
    this.bigPicture = null;
  }

  public changePicture(isNext: boolean, event: Event) {
    let nextPicture: SafeUrl;
    const shownPictures: SafeUrl[] = [].concat(
      ...this.categories.filter(category => category.isShown).map(category => category.bigPictures)
    );

    event.stopPropagation();

    if (isNext) {
      nextPicture = shownPictures[shownPictures.indexOf(this.bigPicture) + 1];
    } else {
      nextPicture = shownPictures[shownPictures.indexOf(this.bigPicture) - 1];
    }

    if (nextPicture) {
      this.bigPicture = nextPicture;
    }
  }
}
