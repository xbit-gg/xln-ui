import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'xln-wallet-scanner',
  templateUrl: './wallet-scanner.component.html',
  styleUrls: ['./wallet-scanner.component.scss']
})
export class WalletScannerComponent implements OnInit {

  SCANNER_FORMATS = [BarcodeFormat.QR_CODE];

  isLoading = true;

  constructor() { }

  ngOnInit(): void {
  }

  onScan() {
    if (!this.isLoading) return;

    this.isLoading = false;
    const scanner = document.getElementById('scanner');
    console.log(scanner);
    if (scanner) {
      scanner.style.display =  'block';
    }
  }

  scanSuccess(decoded: string) {
    console.log(decoded);
  }

  scanError(error: any) {
    console.error(error);
  }

}
