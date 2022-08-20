import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {GetWalletResponse, Transaction, UpdateWalletOptionsRequest, Wallet, XlnService} from "../../../../services/xln.service";
import {WalletTableComponent} from "../wallet-table/wallet-table.component";
import {faArrowAltCircleDown, faArrowAltCircleUp, faCheck, faEdit} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'xln-wallet-management',
  templateUrl: './wallet-management.component.html',
  styleUrls: ['./wallet-management.component.scss']
})
export class WalletManagementComponent implements OnInit, AfterViewInit {

  @Input()
  walletTable: WalletTableComponent;

  error: string = "";
  isLoading = true;
  hasWallet = false;
  
  editNameIcon = faEdit;
  saveNameIcon = faCheck;
  isEditingName = false;
  walletName = new FormControl('');

  wallet: GetWalletResponse;
  transactions: Transaction[] = [];

  locked = false;

  constructor(private xln: XlnService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.walletTable.subscribeSelectedWallet().subscribe(id => {
      if (!id) {
        this.hasWallet = false;
        return;
      }
      this.hasWallet = true;
      this.isLoading = true;
      this.xln.getWallet(id).subscribe({
        next: wallet => {
          this.setWallet(wallet);
        }, error: err => {
          this.error = this.error + '\n' + err.error.message;
          this.isLoading = false;
        }
      })
    });
  }

  private setWallet(wallet: GetWalletResponse) {
    this.isEditingName = false;
    this.isLoading = false;
    this.transactions = [];
    this.wallet = wallet;
    if (wallet.latestTransaction) {
      this.transactions.push(wallet.latestTransaction);
    }
    this.walletName.setValue(wallet.walletName);
    this.locked = wallet.locked;
  }

  onTransfer(tx: Transaction) {
    this.transactions.unshift(tx);
    this.transactions.pop();
    this.xln.getWallet(this.wallet.walletId).subscribe(wallet => {
      this.wallet = wallet;
    });
  }

  transactionWallet(tx: Transaction): string {
    return this.wallet.walletId == tx.toWallet ? tx.fromWallet : tx.toWallet;
  }

  transactionIcon(tx: Transaction): IconDefinition {
    if (this.wallet.walletId == tx.toWallet) {
      return faArrowAltCircleDown
    } else {
      return faArrowAltCircleUp
    }
  }

  getMoreTransactions(amount: number) {
    this.xln.getTransactions(this.wallet.walletId, true, amount, this.transactions.length).subscribe({
      next: res => {
        this.transactions.push(...res.transactions);
      }, error: err => {
        this.error = err.error.message;
      }}
    )
  }

  openWallet() {
    this.router.navigate([]).then((_) => {
      window.open('/wallet/' + this.wallet.walletId);
    });
  }

  toggleWalletLock() {
    if (this.locked) {
        this.updateWallet({unlock: true})
    } else {
        this.updateWallet({lock: true})
    }
  }

  editName() {
    this.isEditingName = true;
  }

  setName() {
    this.isEditingName = false;
    if (this.walletName.value !== this.wallet.walletName) {
      this.updateWallet({walletName: this.walletName.value});
    }
  }

  private updateWallet(req: UpdateWalletOptionsRequest) {
    this.xln.updateWalletOptions(this.wallet.walletId, req).subscribe({
      next: res => {
        this.xln.getWallet(this.wallet.walletId).subscribe(wallet => {
          this.setWallet(wallet);
        });
      }, error: err => {
        this.error = err.error.message;
      }
    })
  }


}
