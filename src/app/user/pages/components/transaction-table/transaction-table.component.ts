import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Transaction, Wallet, XlnService} from "../../../../services/xln.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable} from "rxjs";

@Component({
  selector: 'xln-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {

  columnList: {name: string, value: string}[] = [
    {name: 'Time', value:'timestamp'},
    {name: 'From', value:'fromWallet'},
    {name: 'To', value:'toWallet'},
    {name: 'Amount', value:'amount'},
    {name: 'Fees', value:'feesPaid'},
  ];
  displayedColumns: string[] = ['timestamp', 'fromWallet', 'toWallet', 'amount', 'feesPaid'];
  selectedWallet: FormControl = new FormControl(undefined);
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();

  isLoading = true;
  error: string

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private xln: XlnService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getTransactions() {
    this.isLoading = true;
    this.xln.getUserTransactions(true, 0, 0).subscribe({next: res => {
        this.dataSource.data = res.transactions;
        this.isLoading = false;
      }, error: err => {
        this.error = err.message;
        this.isLoading = false;
      }});
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
