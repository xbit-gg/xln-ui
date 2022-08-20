import { Component, OnDestroy, OnInit } from '@angular/core';
import { TxtExporterService } from 'mat-table-exporter';
import { Transaction, XlnService } from 'src/app/services/xln.service';
import {faArrowAltCircleDown, faArrowAltCircleUp, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'xln-latest-transactions',
  templateUrl: './latest-transactions.component.html',
  styleUrls: ['./latest-transactions.component.scss']
})
export class LatestTransactionsComponent implements OnInit, OnDestroy {

  transactions: Transaction[] = [];

  private NUM_TRANSCATIONS = 5;
  private UPDATE_INTERVAL = 5000;

  private intervalTask: any; 

  constructor(private xln: XlnService) { }

  ngOnInit(): void {
    this.loadLatestTransations();
    this.intervalTask = setInterval(() => {
      this.loadLatestTransations();
    }, this.UPDATE_INTERVAL);
  }

  ngOnDestroy(): void {
      clearInterval(this.intervalTask);
  }

  private loadLatestTransations() {
    this.xln.getUserTransactions(true, this.NUM_TRANSCATIONS * 2, 0).subscribe((res) => {
      for (let i = res.transactions.length - 1; i >= 0; i--) {
        const tx = res.transactions[i];
        if (!this.addTransaction(tx)) return;
      }
    });
  }

  private addTransaction(tx: Transaction): boolean {
    if (this.transactions.length && this.transactions[this.transactions.length - 1].id === tx.id) {
      return false;
    }

    if (this.transactions.length === this.NUM_TRANSCATIONS) {
      this.transactions.splice(this.transactions.length - 1, 1);
    }
    this.transactions.unshift(tx);
    return true;
  }

  transactionIcon(tx: Transaction): IconDefinition {
    if (tx.toWallet && tx.fromWallet) {
      return faMinusCircle;
    } else if (tx.toWallet) {
      return faArrowAltCircleDown;
    } else {
      return faArrowAltCircleUp;
    }
  }

}
