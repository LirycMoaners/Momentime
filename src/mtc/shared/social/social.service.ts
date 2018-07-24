import { Social } from './social.model';
import { Injectable } from '@angular/core';

@Injectable()
export class SocialService {
  socialList: Social[] = [
    {name: 'youtube', url: 'https://www.youtube.com/channel/UCh_K4rAA8CEzAu6pK-2gPHQ'},
    {name: 'instagram', url: 'https://www.instagram.com/momen_time/'},
    {name: 'facebook', url: 'https://www.facebook.com/momen.time.imagez.vous/'},
  ];
}
