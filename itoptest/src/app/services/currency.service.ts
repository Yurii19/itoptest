
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICurrency, ICurrencyEntry } from '../types';
import { CURRENCIES } from '../types';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  usdCourse$ : Subject<any> = new Subject();
  eurCourse$ : Subject<any> = new Subject();
  //CURRENCIES: any;
  //usdCourse$ : Subject<any> = new Subject();
  
  constructor(
    private http: HttpClient
  ) { 
    this.getCurrency();
  }

  getCurrency() {
    this.http.get('https://api.monobank.ua/bank/currency').subscribe(d => {
      const dollar = Object.values(d).find((el: ICurrencyEntry) => el.currencyCodeA === CURRENCIES.USD.code)
      this.usdCourse$.next(dollar)
      const euro = Object.values(d).find((el: ICurrencyEntry) => el.currencyCodeA === CURRENCIES.EUR.code)
      this.eurCourse$.next(euro)
    })
  }

  getUsdCourse(){
    return this.usdCourse$;
  }

  getEurCourse(){
    return this.eurCourse$;
  }
}
