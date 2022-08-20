import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleDown, faArrowAltCircleLeft, faArrowAltCircleRight, faArrowAltCircleUp, faArrowCircleLeft, faArrowCircleRight, faArrowLeft, faArrowRight, faBolt } from '@fortawesome/free-solid-svg-icons';
import { Transaction } from 'src/app/services/xln.service';

@Component({
  selector: 'xln-wallet-transaction',
  templateUrl: './wallet-transaction.component.html',
  styleUrls: ['./wallet-transaction.component.scss']
})
export class WalletTransactionComponent implements OnInit {

  @Input()
  walletId: string;
  @Input()
  tx: Transaction

  constructor() { }

  ngOnInit(): void {
  }
  
  /*
  transactionIcon(tx: Transaction): IconDefinition {
    if (!tx.toWallet || !tx.fromWallet) {
      return faBolt;
    } else if (tx.toWallet == this.walletId) {
      return faArrowRight
    } else {
      return faArrowLeft;
    }
  }
  */

  transactionIcon(tx: Transaction): IconDefinition {
    if (!tx.toWallet || !tx.fromWallet) {
      return faBolt;
    } else if (tx.toWallet == this.walletId) {
      return faArrowAltCircleRight
    } else {
      return faArrowAltCircleLeft;
    }
  }


}
