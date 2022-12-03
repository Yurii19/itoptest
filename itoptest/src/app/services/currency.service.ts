
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICurrency, ICurrencyEntry } from '../types';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  CURRENCIES: any = {
   UAH: { name: 'UAH', code: 980 },
    USD:{ name: 'USD', code: 840 },
    EUR:{ name: 'EUR', code: 978 },
  
  }
  usdCourse$ : Subject<any> = new Subject();
  eurCourse$ : Subject<any> = new Subject();
  //usdCourse$ : Subject<any> = new Subject();
  
  constructor(
    private http: HttpClient
  ) { 
    this.getCurrency();
  }

  getCurrency() {
    this.http.get('https://api.monobank.ua/bank/currency').subscribe(d => {
      const dollar = Object.values(d).find((el: ICurrencyEntry) => el.currencyCodeA === this.CURRENCIES.USD.code)
      this.usdCourse$.next(dollar)
      const euro = Object.values(d).find((el: ICurrencyEntry) => el.currencyCodeA === this.CURRENCIES.EUR.code)
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
