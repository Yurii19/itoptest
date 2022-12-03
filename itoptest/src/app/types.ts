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