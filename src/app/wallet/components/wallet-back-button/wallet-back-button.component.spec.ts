import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBackButtonComponent } from './wallet-back-button.component';

describe('WalletBackButtonComponent', () => {
  let component: WalletBackButtonComponent;
  let fixture: ComponentFixture<WalletBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletBackButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
