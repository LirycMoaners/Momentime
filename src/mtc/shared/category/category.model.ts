import { SafeUrl } from '@angular/platform-browser';

export class Category {
  name: string;
  firstPic: SafeUrl;
  pictures: SafeUrl[];
  bigPictures: SafeUrl[];
  isShown: boolean;
}
