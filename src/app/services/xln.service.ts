import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie';
import {Observable, Timestamp} from 'rxjs';
import {environment} from '../../environments/environment';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class XlnService {

  private api = environment.xlnApiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  public getWallets(data: boolean): Observable<ListWalletsResponse> {
    const options = {
      params: new HttpParams().set('data', data.toString()),
    };
    return this.http.get<ListWalletsResponse>(this.api + '/v1/wallet', options);
  }

  public createWallet(request: CreateWalletRequest): Observable<CreateWalletResponse> {
    return this.http.post<CreateWalletResponse>(this.api + '/v1/wallet', request);
  }

  public getWallet(walletId: string): Observable<GetWalletResponse> {
    return this.http.get<GetWalletResponse>(this.api + '/v1/wallet/' + walletId);
  }

  public getTransactions(walletId: string, descending: boolean, limit: number, offset: number, fromTime?: Date, toTime?: Date) : Observable<GetTransactionsResponse>{
    const options = {
      params: new HttpParams()
        .set('descending', descending)
        .set('limit', limit.toString())
        .set('offset', offset.toString()),
    };
    if (fromTime) options.params = options.params.set('from_time', fromTime.toISOString());
    if (toTime) options.params = options.params.set('to_time', toTime.toISOString());
    return this.http.get<GetTransactionsResponse>(this.api + '/v1/wallet/' + walletId + '/transactions', options);
  }

  public getUserTransactions(descending: boolean, limit: number, offset: number, fromTime?: Date, toTime?: Date): Observable<GetUserTransactionsResponse> {
    let options = {
      params: new HttpParams()
        .set('descending', descending)
        .set('limit', limit)
        .set('offset', offset),
    };
    if (fromTime) options.params = options.params.set('from_time', fromTime.toISOString());
    if (toTime) options.params = options.params.set('to_time', toTime.toISOString());
    return this.http.get<GetUserTransactionsResponse>(this.api + '/v1/user/transactions', options);
  }

  public getLatestUserTransactions(days: number): Observable<GetUserTransactionsResponse> {
    const now = new Date();
    const fromTime = new Date(now.toDateString());
    fromTime.setDate(now.getDate() - days + 1);
    return this.getUserTransactions(true, 0, 0, fromTime);
  }

  public transfer(walletId: string, toWalletId: string, amount: number): Observable<TransferResponse> {
    const request = {toWalletId, amount};
    return this.http.post<TransferResponse>(this.api + '/v1/wallet/' + walletId + '/transfer', request);
  }

  public updateWalletOptions(walletId: string, request: UpdateWalletOptionsRequest): Observable<{}> {
    return this.http.patch<{}>(this.api + '/v1/wallet/' + walletId, request);
  }

}

export interface Wallet {
  id: string;
  name: string;
  balance: string;
  creationTime: string;
  latestTransactionTime: string;
}

export interface Transaction {
  id: string;
  time: string;
  fromWallet: string;
  toWallet: string;
  amount: string;
  feesPaid: string;
}

export interface ListWalletsResponse {
  walletIds: string[];
  data: Wallet[];
}

export interface CreateWalletRequest {
  walletId: string
  walletName: string
}

export interface CreateWalletResponse {
  walletId: string
  apiKey: string
}

export interface GetWalletResponse {
  walletId: string;
  walletName: string;
  balance: string;
  apiKey: string;
  creationTime: string;
  locked: boolean;
  latestTransaction: Transaction;
  latestTransactionTime: string;
}

export interface GetTransactionsResponse {
  transactions: Transaction[];
}

export interface TransferResponse {
  success: boolean;
  failure_reason: string;
}

export interface GetUserTransactionsResponse {
  transactions: Transaction[];
  nextOffset: number;
  totalRecords: string;
}

export interface UpdateWalletOptionsRequest {
  walletName?: string;
  lock?: boolean;
  unlock?: boolean;
}

