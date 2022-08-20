import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'xln-wallet-back-button',
  templateUrl: './wallet-back-button.component.html',
  styleUrls: ['./wallet-back-button.component.scss']
})
export class WalletBackButtonComponent implements OnInit {

  backIcon = faArrowLeft;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
