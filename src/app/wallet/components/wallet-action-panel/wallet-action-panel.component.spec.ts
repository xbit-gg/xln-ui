import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletActionPanelComponent } from './wallet-action-panel.component';

describe('WalletActionPanelComponent', () => {
  let component: WalletActionPanelComponent;
  let fixture: ComponentFixture<WalletActionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletActionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
