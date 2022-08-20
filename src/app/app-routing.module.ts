import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './user/pages/dashboard/dashboard.component';
import {WalletsComponent} from './user/pages/wallets/wallets.component';
import {TransfersComponent} from "./user/pages/transfers/transfers.component";
import {TransactionsComponent} from "./user/pages/transactions/transactions.component";
import {SettingsComponent} from "./user/pages/settings/settings.component";
import { UserAuthGuard } from './guards/user-auth.guard';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRootComponent } from './user/user-root/user-root.component';
import { WalletRootComponent } from './wallet/wallet-root/wallet-root.component';
import { WalletComponent } from './wallet/wallet/wallet.component';
import { WalletAuthGuard } from './guards/wallet-auth.guard';
import { WalletLoginComponent } from './wallet/wallet-login/wallet-login.component';
import { WalletSettingsComponent } from './wallet/pages/wallet-settings/wallet-settings.component';
import { WalletScannerComponent } from './wallet/components/wallet-scanner/wallet-scanner.component';

const routes: Routes = [
  {path: 'login', component: UserLoginComponent},
  {path: '', component: UserRootComponent, children: [
    {path: 'dashboard', component: DashboardComponent, canActivate: [UserAuthGuard]},
    {path: 'wallets', component: WalletsComponent, canActivate: [UserAuthGuard]},
    {path: 'transfer', component: TransfersComponent, canActivate: [UserAuthGuard]},
    {path: 'transactions', component: TransactionsComponent, canActivate: [UserAuthGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [UserAuthGuard]},
  ]},
  {path: 'wallet-login', component: WalletLoginComponent},
  {path: 'wallet/:id', component: WalletRootComponent, children: [
    {path: '', component: WalletComponent, canActivate: [WalletAuthGuard]},
    {path: 'scan', component: WalletScannerComponent, canActivate: [WalletAuthGuard]},
    {path: 'settings', component: WalletSettingsComponent, canActivate: [WalletAuthGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
