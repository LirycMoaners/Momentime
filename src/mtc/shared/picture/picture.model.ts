import { SafeUrl } from '@angular/platform-browser';

export class Picture {
  constructor(
    public url: SafeUrl,
    public category: string,
    public isShowed: boolean
  ) {}
}
