import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {faArrowAltCircleDown, faArrowAltCircleUp, faCog, faMinusCircle, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import { combineLatestWith, forkJoin, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GetWalletResponse, Transaction, XlnService } from 'src/app/services/xln.service';

@Component({
  selector: 'xln-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  settingsIcon = faCog;

  walletId: string;

  isLoading = true;
  error: string;
  wallet: GetWalletResponse

  TXS_PER_LOAD = 15;
  endTime: Date = new Date();
  offset = 0;
  transactions: Transaction[];

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private xln: XlnService) {
    this.route.params.subscribe(params => this.walletId = params['id']);
  }

  ngOnInit(): void {
    this.loadWallet();
  }

  private loadWallet() {
    this.xln.getWallet(this.walletId).subscribe({
      next: wallet => {
        this.xln.getTransactions(this.walletId, true, this.TXS_PER_LOAD, this.offset, undefined, this.endTime).subscribe(res => {
          this.isLoading = false;
          this.offset += this.TXS_PER_LOAD;
          this.wallet = wallet;
          this.transactions = res.transactions;
        });
      }, error: err => {
        this.isLoading = false;
        this.error = err.error.message;
      }
    });
  }

  openSettingsPage() {
    this.router.navigate(['settings'], {relativeTo: this.route});
  }

  onScroll() {
    this.xln.getTransactions(this.walletId, true, this.TXS_PER_LOAD, this.offset, undefined, this.endTime).subscribe(res => {
      this.offset += this.TXS_PER_LOAD;
      this.transactions.push(...res.transactions);
    });
  }

  transactionIcon(tx: Transaction): IconDefinition {
    if (tx.toWallet == this.walletId) {
      return faArrowAltCircleDown;
    } else {
      return faArrowAltCircleUp;
    }
  }

}
