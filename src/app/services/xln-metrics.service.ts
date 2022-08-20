import { Injectable } from '@angular/core';
import {Transaction, XlnService} from "./xln.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class XlnMetricsService {

  constructor(private xln: XlnService, private http: HttpClient, private cookieService: CookieService) {

  }

  public satStringToInteger(satString: string): number {
    const sats = satString.length > 3 ? satString.substring(0, satString.length - 3) : '0';
    return parseInt(sats);
  }


  public getBalanceSummary(): Observable<BalanceSummary> {
    return this.xln.getWallets(true).pipe(map((res) => {
      return {
        totalBalance: res.data.map(w => BigInt(w.balance)).reduce((a, b) => a + b, BigInt(0)).toString(10),
        walletBalances: res.data.map(w => {
          return {id: w.id, name: w.name, balance: w.balance};
        }),
      }
    }));
  }

  public getBalanceChanges(intervals: number, intervalType: 'day'|'week'|'month' = 'day'): Observable<Bucketed<BalanceChange>> {
    const defaultValue = {
      net: 0,
      inflow: 0,
      outflow: 0,
    }
    return this.bucketedTransactionMap(intervals, intervalType, defaultValue, (acc, tx) => {
        const inflow = !tx.fromWallet ? this.satStringToInteger(tx.amount) : 0;
        const outflow = !tx.toWallet ? this.satStringToInteger(tx.amount) : 0;
        acc.inflow += inflow;
        acc.outflow += outflow;
        acc.net += inflow - outflow;
        return acc;
    });
  }

  public getTransactionVolumes(intervals: number, intervalType: 'day'|'week'|'month' = 'day'): Observable<Bucketed<TransactionVolume>> {
    const defaultValue = {
      count: 0,
      volume: 0,
    }
    return this.bucketedTransactionMap(intervals, intervalType, defaultValue, (acc, tx) => {
      acc.count += 1;
      acc.volume += this.satStringToInteger(tx.amount);
      return acc;
    });
  }

  private bucketedTransactionMap<T>(
    intervals: number, 
    intervalType: 'day'|'week'|'month',
    defaultValue: T,
    fn: (accumulator: T, x: Transaction) => T): Observable<Bucketed<T>> {
    const dateToKey : (date: Date) => string = (date) => {
      if (intervalType === 'day') {
        return date.toDateString();
      } else if (intervalType === 'week') {
        const d = new Date(date);
        d.setDate(d.getDate() - date.getDay());
        return d.toDateString();
      } else {
        const d = new Date(date);
        d.setDate(d.getDate() - date.getDate() + 1);
        return d.toDateString();
      }
    }

    let days = intervalType === 'day' ? intervals : intervals * 7 - 1;
    if (intervalType === 'month') {
      const now = new Date();
      days = now.getDate();
      for (let i = 0; i < intervals - 1; i++) {
        now.setDate(0);
        days += now.getDate();
      }
    }

    return this.xln.getLatestUserTransactions(days).pipe(map(res => {
      const data: Bucketed<T> = {};
      const date = new Date();
      for (let i = 0; i < days; i++) {
        data[dateToKey(date)] = {...defaultValue};
        date.setDate(date.getDate() - 1);
      }
      for (let tx of res.transactions) {
        const dateKey = dateToKey(new Date(tx.time));
        data[dateKey] = fn(data[dateKey], tx);
      }
      return data;
    }));
  }
}

export interface BalanceSummary {
  totalBalance: string;
  walletBalances: WalletBalance[]
}

export interface WalletBalance {
  id: string;
  name: string;
  balance: string;
}

export interface BalanceChange {
  inflow: number;
  outflow: number;
  net: number;
}

export interface TransactionVolume {
  count: number;
  volume: number;
}

export interface Bucketed<T> {
  [key: string]: T;
}

