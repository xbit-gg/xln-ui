import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'xln-wallet-action-panel',
  templateUrl: './wallet-action-panel.component.html',
  styleUrls: ['./wallet-action-panel.component.scss']
})
export class WalletActionPanelComponent implements OnInit {

  scanIcon = faQrcode

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
  }

  scan() {
    this.router.navigate(['scan'], {relativeTo: this.route});
  }

}
