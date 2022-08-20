import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRootComponent } from './wallet-root.component';

describe('WalletRootComponent', () => {
  let component: WalletRootComponent;
  let fixture: ComponentFixture<WalletRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
