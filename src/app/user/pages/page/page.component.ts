import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'xln-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input()
  title: string;

  constructor() {
    this.title = 'page';
  }

  ngOnInit(): void {
  }

}
