import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Wallet, XlnService} from '../../../../services/xln.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

@Component({
  selector: 'xln-wallet-table',
  templateUrl: './wallet-table.component.html',
  styleUrls: ['./wallet-table.component.scss']
})
export class WalletTableComponent implements OnInit, AfterViewInit {

  columnList: {name: string, value: string}[] = [
    {name: 'ID', value:'id'},
    {name: 'Name', value:'name'},
    {name: 'Created', value:'createdAt'},
    {name: 'Latest Transaction', value:'latestTransactionAt'},
    {name: 'Balance', value:'balance'},
  ];
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'balance'];
  selectedWallet: FormControl = new FormControl(undefined);
  dataSource: MatTableDataSource<Wallet> = new MatTableDataSource<Wallet>();

  isLoading = true;
  error: string

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  createWalletId = new FormControl('');

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private xln: XlnService) {
  }

  ngOnInit(): void {
    this.getWallets();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getWallets() {
    this.isLoading = true;
    this.xln.getWallets(true).subscribe({next: res => {
      this.dataSource.data = res.data;
      this.isLoading = false;
    }, error: err => {
      this.error = err.message;
      this.isLoading = false;
    }});
  }

  selectWallet(id: string) {
    if (this.selectedWallet.value === id) {
      this.selectedWallet.setValue('');
    } else {
      this.selectedWallet.setValue(id);
    }
  }

  public subscribeSelectedWallet(): Observable<string> {
    return this.selectedWallet.valueChanges
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createWallet(): void {
    const req  = {walletId: this.createWalletId.value, walletName: this.createWalletId.value};
    this.createWalletId.setValue('');
    this.xln.createWallet(req).subscribe({next: res => {
      this.snackBar.open('Created new wallet "' + req.walletId + '"', undefined, {
        duration: 5000,
      })
      this.getWallets();
    }, error: err => {
        this.snackBar.open('Could not create wallet: ' + err.error.error, undefined, {
          duration: 5000
        });
    }})
  }


}
