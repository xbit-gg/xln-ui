import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletScannerComponent } from './wallet-scanner.component';

describe('WalletScannerComponent', () => {
  let component: WalletScannerComponent;
  let fixture: ComponentFixture<WalletScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
