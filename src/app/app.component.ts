import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {BrowserClientService} from './services/browser-client.service';
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav?: MatDrawer;

  @HostBinding('class') styleModeClass = '';

  title = 'XLN';

  constructor(private overlayContainer: OverlayContainer, public browserClient: BrowserClientService) { }

  ngOnInit(): void {
    this.updateStyleMode(this.browserClient.isDarkmode());
    this.browserClient.subscribeDarkmode().subscribe((darkMode) => {
      this.updateStyleMode(darkMode);
    });
  }

  private updateStyleMode(dark: boolean): void {
    this.styleModeClass = dark ? 'dark-theme' : '';
    if (dark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme')
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme')
    }
  }
}
