import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../shared/category/category.service';
import { PictureService } from '../shared/picture/picture.service';
import { Picture } from '../shared/picture/picture.model';
import { Observable } from 'rxjs/Observable';
import { Category } from '../shared/category/category.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  public categories: Category[] = [];
  public pictures: Picture[] = [];
  public showedCategory: Category = null;
  public bigPicture: Picture;
  allCategoriesVisible = true;
  picturesUrl: string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private pictureService: PictureService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    Observable.forkJoin(
      this.categoryService.getCategories(),
      this.pictureService.getPictures()
    ).subscribe(([categories, pictures]: [Category[], Picture[]]) => {
      this.categories = categories;
      this.pictures = pictures;

      this.showedCategory = this.categories
        .find((category: Category) => category.name === this.route.snapshot.queryParams['category']) || null;
      if (this.showedCategory) {
        this.switchCategoryVisibility(this.showedCategory);
      }
    });
  }

  public switchCategoryVisibility(category: Category) {
    this.showedCategory = category;
    for (const picture of this.pictures) {
      if (category === null || picture.category === category.name) {
        picture.isShowed = true;
      } else {
        picture.isShowed = false;
      }
    }
  }

  public onClickPicture(picture: Picture) {
    this.bigPicture = picture;
  }

  public closePicture() {
    this.bigPicture = null;
  }

  public changePicture(isNext: boolean) {
    let nextPicture: Picture;
    const showedPictures: Picture[] = this.pictures.filter((picture) => picture.isShowed);

    if (isNext) {
      nextPicture = showedPictures[showedPictures.indexOf(this.bigPicture) + 1];
    } else {
      nextPicture = showedPictures[showedPictures.indexOf(this.bigPicture) - 1];
    }

    if (nextPicture) {
      this.bigPicture = nextPicture;
    }
  }
}
