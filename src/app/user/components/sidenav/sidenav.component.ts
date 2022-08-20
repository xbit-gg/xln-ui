import {Component, Input, OnInit} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faCogs, faExchangeAlt, faReceipt, faTachometerAlt, faWallet} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {BrowserClientService} from "../../../services/browser-client.service";
import {MatSidenav} from "@angular/material/sidenav";

interface Page {
  title: string;
  icon: IconProp;
  path: string;
}

@Component({
  selector: 'xln-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input()
  sidenav?: MatSidenav

  pages: Page[] = [
    {
      title: 'Dashboard',
      icon: faTachometerAlt,
      path: '/dashboard',
    },
    {
      title: 'Manage Wallets',
      icon: faWallet,
      path: '/wallets',
    },
    {
      title: 'Transfer Funds',
      icon: faExchangeAlt,
      path: '/transfer',
    },
    {
      title: 'View Transactions',
      icon: faReceipt,
      path: '/transactions',
    },
    {
      title: 'Settings',
      icon: faCogs,
      path: '/settings',
    },
  ];

  constructor(private router: Router, private browserClient: BrowserClientService) { }

  ngOnInit(): void {
  }

  onPageClick(): void {
    if (this.browserClient.isSmallScreen() && this.sidenav) {
      this.sidenav.toggle();
    }
  }

  isSelected(page: string): boolean {
    return this.router.url == page;
  }

}
