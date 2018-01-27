import { Component, OnInit } from '@angular/core';
import { MainBarService } from '../shared/main-bar/main-bar.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../shared/category/category.service';
import { Category } from '../shared/category/category.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  public categories: Category[] = [];

  constructor(
    private mainBarService: MainBarService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.mainBarService.modifyIsHidden(true);
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
  }
}
