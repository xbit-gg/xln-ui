import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './user/components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SidenavComponent} from './user/components/sidenav/sidenav.component';
import {DashboardComponent} from './user/pages/dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {WalletsComponent} from './user/pages/wallets/wallets.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {PageComponent} from './user/pages/page/page.component';
import {PanelComponent} from './components/panel/panel.component';
import {CookieModule} from 'ngx-cookie';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionsComponent } from './user/pages/transactions/transactions.component';
import { SettingsComponent } from './user/pages/settings/settings.component';
import { WalletTableComponent } from './user/pages/components/wallet-table/wallet-table.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { SatPipe } from './pipes/sat.pipe';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableExporterModule} from "mat-table-exporter";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from "@angular/flex-layout";
import { WalletManagementComponent } from './user/pages/components/wallet-management/wallet-management.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { TransfersComponent } from './user/pages/transfers/transfers.component';
import {TransferComponent} from "./user/components/transfer/transfer.component";
import {ToastrModule} from "ngx-toastr";
import { TransactionTableComponent } from './user/pages/components/transaction-table/transaction-table.component';
import { TransactionsSummaryComponent } from './user/pages/components/metrics/transactions-summary/transactions-summary.component';
import { BalanceSummaryComponent } from './user/pages/components/metrics/balance-summary/balance-summary.component';
import { ChartComponent } from './user/components/chart/chart.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { BitcoinPipe } from './pipes/bitcoin.pipe';
import { BalanceChangesComponent } from './user/pages/components/metrics/balance-changes/balance-changes.component';
import { LatestTransactionsComponent } from './user/pages/components/metrics/latest-transactions/latest-transactions.component';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { RouterModule } from '@angular/router';
import { UserRootComponent } from './user/user-root/user-root.component';
import { WalletComponent } from './wallet/wallet/wallet.component';
import { WalletRootComponent } from './wallet/wallet-root/wallet-root.component';
import { WalletLoginComponent } from './wallet/wallet-login/wallet-login.component';
import { WalletActionPanelComponent } from './wallet/components/wallet-action-panel/wallet-action-panel.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WalletTransactionComponent } from './components/wallet-transaction/wallet-transaction.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { WalletSettingsComponent } from './wallet/pages/wallet-settings/wallet-settings.component';
import { WalletBackButtonComponent } from './wallet/components/wallet-back-button/wallet-back-button.component';
import { WalletScannerComponent } from './wallet/components/wallet-scanner/wallet-scanner.component';
import { TransferTableComponent } from './user/pages/components/transfer-table/transfer-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    WalletsComponent,
    PageComponent,
    PanelComponent,
    TransferComponent,
    TransactionsComponent,
    SettingsComponent,
    WalletTableComponent,
    SatPipe,
    WalletManagementComponent,
    TransfersComponent,
    TransactionTableComponent,
    TransactionsSummaryComponent,
    BalanceSummaryComponent,
    ChartComponent,
    BitcoinPipe,
    BalanceChangesComponent,
    LatestTransactionsComponent,
    UserLoginComponent,
    UserRootComponent,
    WalletComponent,
    WalletRootComponent,
    WalletLoginComponent,
    WalletActionPanelComponent,
    WalletTransactionComponent,
    WalletSettingsComponent,
    WalletBackButtonComponent,
    WalletScannerComponent,
    TransferTableComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatOptionModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatTabsModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatCheckboxModule,
        CookieModule.forRoot(),
        FontAwesomeModule,
        ReactiveFormsModule,
        RouterModule,
        MatTableExporterModule.forRoot({xlsxLightWeight: true}),
        ToastrModule.forRoot(),
        InfiniteScrollModule,
        ZXingScannerModule,
    ],
  providers: [
    SatPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
