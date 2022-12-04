import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICurrency, ICurrencyEntry } from '../types';
import { CURRENCIES } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  curencies: ICurrencyEntry[] = [];
  usdRate$: Subject<any> = new Subject();
  eurRate$: Subject<any> = new Subject();
  //CURRENCIES: any;
  //usdCourse$ : Subject<any> = new Subject();

  constructor(private http: HttpClient) {
    this.getCurrency();
  }

  getRate(curencies: ICurrency[]): number {
    console.log('getRate >>> ',curencies)
    const [cur1, cur2]: ICurrency[] = curencies;

    const rate1 = this.getCurrencyRate(cur1)
    const rate2 = this.getCurrencyRate(cur2)
   
    return +(rate1 / rate2).toFixed(2);
  }

  private getCurrencyRate(curency: ICurrency): number{
    if(curency.code === 980){
      return 1;
    }
    const curEntry: ICurrencyEntry | undefined = this.curencies.find(
      (el) =>
        el.currencyCodeA === curency.code &&
        el.currencyCodeB === CURRENCIES.UAH.code
    );
    console.log(curEntry)
    if (curEntry && curEntry.rateBuy) {
      return curEntry.rateBuy;
    } else if (curEntry && curEntry.rateCross) {
      return curEntry.rateCross;
    } else {
      return -1;
    }
  }

  getCurrency1() {
    
    this.http
      .get('https://api.exchangerate.host/latest?base=USD')
      .subscribe((data) => console.log(data, ' <<<'));
  }

  getCurrency() {
    this.http.get('https://api.monobank.ua/bank/currency').subscribe(
      (data) => {
        this.curencies = Object.values(data);
        const dollar = Object.values(data).find(
          (el: ICurrencyEntry) => el.currencyCodeA === CURRENCIES.USD.code
        );
        this.usdRate$.next(dollar);
        const euro = Object.values(data).find(
          (el: ICurrencyEntry) => el.currencyCodeA === CURRENCIES.EUR.code
        );
        this.eurRate$.next(euro);

        localStorage.setItem('lastRates', JSON.stringify({ dollar, euro }));
      },
      (error) => {
        const lastRates = localStorage.getItem('lastRates');
        if (lastRates) {
          this.usdRate$.next(JSON.parse(lastRates).dollar);
          this.eurRate$.next(JSON.parse(lastRates).euro);
        }
      }
    );
  }

  getUsdCourse() {
    return this.usdRate$;
  }

  getEurCourse() {
    return this.eurRate$;
  }
}
