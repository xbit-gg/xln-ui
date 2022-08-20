import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { OverlayContainer } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BrowserClientService } from 'src/app/services/browser-client.service';

@Component({
  selector: 'xln-user-root',
  templateUrl: './user-root.component.html',
  styleUrls: ['./user-root.component.scss']
})
export class UserRootComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav?: MatDrawer;

  @HostBinding('class') styleModeClass = '';

  title = 'XLN';

  constructor(private overlayContainer: OverlayContainer, public browserClient: BrowserClientService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.auth.userAuth) {
      this.router.navigate(['/login'])
    }
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