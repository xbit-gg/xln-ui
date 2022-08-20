import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<UserAuth|null>;
  private user: Observable<UserAuth|null>;

  private walletSubject: BehaviorSubject<WalletAuth|null>;
  private wallet: Observable<WalletAuth|null>;

  constructor(private router: Router) {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    this.userSubject = new BehaviorSubject(user);
    this.user = this.userSubject.asObservable();

    const walletStr = localStorage.getItem('wallet');
    const wallet = walletStr ? JSON.parse(walletStr) : null;
    this.walletSubject = new BehaviorSubject(wallet);
    this.wallet = this.walletSubject.asObservable();
  }

  public get userAuth(): UserAuth|null {
    return this.userSubject.value;
  }

  public get walletAuth(): WalletAuth|null {
    return this.walletSubject.value;
  }

  userLogin(userId: string, apiKey: string) {
    // TODO support both admin and user keys, not just admin
    const user: UserAuth = {userId, apiKey, keyType: 'admin'};
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  walletLogin(walletId: string, apiKey: string) {
    // TODO support admin, user and wallet keys, not just admin
      const user = this.userAuth;
      if (user) {
        const wallet: WalletAuth = {walletId, userId: user.userId, apiKey, keyType: 'admin'}
        localStorage.setItem('wallet', JSON.stringify(wallet));
        this.walletSubject.next(wallet);
      }
  }

  walletLogout() {
    localStorage.removeItem('wallet');
    this.userSubject.next(null);
    this.router.navigate(['/wallet/login']);
  }
}

export interface UserAuth {
  userId: string;
  apiKey: string;
  keyType: 'admin'|'user'
}

export interface WalletAuth {
  walletId: string;
  userId: string;
  apiKey: string;
  keyType: 'admin'|'user'|'wallet'
}
