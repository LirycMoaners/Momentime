import { Component, OnInit } from '@angular/core';
import { MainBarService } from '../shared/main-bar/main-bar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private mainBarService: MainBarService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.mainBarService.modifyIsHidden(true);
  }
}
