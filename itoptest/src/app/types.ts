export interface ICurrency {
  code: number;
  name: string;
}

export interface ICurrencyEntry {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateSell: number;
  rateBuy: number;
  rateCross: number;
}

export type Currencies = [
  UAH: { name: 'UAH', code: 980 },
  USD:{ name: 'USD', code: 840 },
  EUR:{ name: 'EUR', code: 978 },
]

export const CURRENCIES: any = {
  UAH: { name: 'UAH', code: 980 },
   USD:{ name: 'USD', code: 840 },
   EUR:{ name: 'EUR', code: 978 },
 
 }