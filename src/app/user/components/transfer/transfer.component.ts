import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith, Subscriber} from "rxjs";
import {Transaction, XlnService} from "../../../services/xln.service";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'xln-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  @Input()
  walletId: string;

  @Output()
  onTransfer : EventEmitter<Transaction> = new EventEmitter();

  walletIds: string[] = [];
  filteredWalletIds: Observable<string[]>;

  transferWallet = new FormControl();
  transferAmount = new FormControl();
  transferLoading = false;
  transferDone = false;
  transferSuccess = false;

  successIcon = faCheckCircle;
  failureIcon = faTimesCircle;

  constructor(private xln: XlnService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.filteredWalletIds = this.transferWallet.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)),
    );
    this.xln.getWallets(false).subscribe({
      next: res => {
        this.walletIds = res.walletIds;
      }, error: err => {
        this.toastr.error(err.error.message, 'Transfer failed');
      }
    })
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.walletIds.filter(id => id.toLowerCase().includes(filterValue));
  }

  makeTransfer() {
    this.transferLoading = true;
    this.xln.transfer(this.walletId, this.transferWallet.value, this.transferAmount.value * 1000).subscribe({
      next: res => {
        this.transferSuccess = res.success;
        this.transferLoading = false;
        this.transferDone = true;
        if (res.success) {
          this.xln.getTransactions(this.walletId, true, 1, 0).subscribe(res => {
            this.onTransfer.emit(res.transactions[0])
          });
        }
        setTimeout(() => this.transferDone = false, 3000);
      }, error: err => {
        this.toastr.error(err.error.message, 'Transfer failed');
        this.transferSuccess = false;
        this.transferLoading = false;
        this.transferDone = true;
        setTimeout(() => this.transferDone = false, 3000);
      }
    })
  }


}
