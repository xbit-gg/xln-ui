import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { XlnService } from 'src/app/services/xln.service';

@Component({
  selector: 'xln-transfer-table',
  templateUrl: './transfer-table.component.html',
  styleUrls: ['./transfer-table.component.scss']
})
export class TransferTableComponent implements OnInit, AfterViewInit {

  columnList: {name: string, value: string}[] = [
    {name: 'From', value:'from'},
    {name: 'To', value:'to'},
    {name: 'ID', value:'id'},
    {name: 'Name', value:'createdAt'},
    {name: 'Balance', value:'balance'},
  ];
  displayedColumns: string[] = ['from', 'to', 'id', 'name', 'balance'];
  dataSource: MatTableDataSource<TransferWallet> = new MatTableDataSource<TransferWallet>();

  fromSelected: 'none'|'partial'|'all' = 'none' 
  toSelected: 'none'|'partial'|'all' = 'none' 

  isLoading = true;
  error: string

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private xln: XlnService) { }

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
      this.dataSource.data = res.data.map(wal => {return {
        from: false,
        to: false,
        id: wal.id,
        name: wal.name,
        balance: wal.balance
      }})
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

    
    const fromAll = this.dataSource._filterData(this.dataSource.data).every(wal => wal.from);
    const fromNone = this.dataSource._filterData(this.dataSource.data).every(wal => !wal.from);
    this.fromSelected = fromAll ? 'all' : (fromNone ? 'none' : 'partial');

    const toAll = this.dataSource._filterData(this.dataSource.data).every(wal => wal.to);
    const toNone = this.dataSource._filterData(this.dataSource.data).every(wal => !wal.to);
    this.toSelected = toAll ? 'all' : (toNone ? 'none' : 'partial');
  }

  toggleGlobalFrom() {
    if (this.fromSelected === 'all') {
      this.fromSelected = 'none';
      this.dataSource._filterData(this.dataSource.data).forEach(wal => wal.from = false);
    } else {
      this.fromSelected = 'all';
      this.dataSource._filterData(this.dataSource.data).forEach(wal => wal.from = true);
    }
  }

  toggleGlobalTo() {
    if (this.toSelected === 'all') {
      this.toSelected = 'none';
      this.dataSource._filterData(this.dataSource.data).forEach(wal => wal.to = false);
    } else {
      this.toSelected = 'all';
      this.dataSource._filterData(this.dataSource.data).forEach(wal => wal.to = true);
    }
  }

  toggleFrom(row: TransferWallet) {
    row.from = !row.from;
    if (row.from) {
      this.fromSelected = this.dataSource._filterData(this.dataSource.data).every(wal => wal.from) ? 'all' : 'partial';
    } else {
      this.fromSelected = this.dataSource._filterData(this.dataSource.data).every(wal => !wal.from) ? 'none' : 'partial';
    }
  }

  toggleTo(row: TransferWallet) {
    row.to = !row.to;
    if (row.from) {
      this.toSelected = this.dataSource._filterData(this.dataSource.data).every(wal => wal.to) ? 'all' : 'partial';
    } else {
      this.toSelected = this.dataSource._filterData(this.dataSource.data).every(wal => !wal.to) ? 'none' : 'partial';
    }
  }
}

interface TransferWallet {
  from: boolean;
  to: boolean;
  id: string;
  name: string;
  balance: string;
}
