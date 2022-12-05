import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ICurrency, ICurrencyEntry } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  BASE_API: string = 'https://api.exchangerate.host/latest';
  curencies: ICurrencyEntry[] = [];
  usdRate$: Subject<number> = new Subject();
  eurRate$: Subject<number> = new Subject();

  constructor(private http: HttpClient) {
    this.getHeaderRates();
  }

  getRate(curencies: ICurrency[]): Observable<any> {
    const [cur1, cur2]: ICurrency[] = curencies;
    return this.http
      .get(`${this.BASE_API}?base=${cur1.name}`)
      .pipe(map((data: any) => data.rates[cur2.name]));
  }

  getHeaderRates() {
    this.http
      .get('https://api.exchangerate.host/latest?base=UAH')
      .subscribe((rates: any) => {
        this.usdRate$.next(1 / rates.rates.USD);
        this.eurRate$.next(1 / rates.rates.EUR);
      });
  }

  getUsdCourse() {
    return this.usdRate$;
  }

  getEurCourse() {
    return this.eurRate$;
  }
}
