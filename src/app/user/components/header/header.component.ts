import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {BrowserClientService} from '../../../services/browser-client.service';
import { faBars, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'xln-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  sidenav?: MatDrawer;
  @Input()
  decorative: boolean = false;

  menuIcon = faBars
  modeIcon: IconProp;
  userIcon = faUser;

  constructor(private browserClient: BrowserClientService, private auth: AuthService) {
    this.modeIcon = this.browserClient.isDarkmode() ? faSun : faMoon ;
  }

  ngOnInit(): void {
    this.browserClient.subscribeDarkmode().subscribe((darkMode) => {
      this.modeIcon = darkMode ? faSun : faMoon;
    })
  }

  toggleSidenav(): void {
    if (this.sidenav) {
      if (!this.sidenav.opened) {
        this.sidenav.mode = this.browserClient.isSmallScreen() ? 'over' : 'side';
      }
      this.sidenav.toggle();
    }
  }

  toggleDarkmode(): void {
    this.browserClient.toggleDarkmode();
  }

  logout(): void {
    this.auth.userLogout();
  }

}
