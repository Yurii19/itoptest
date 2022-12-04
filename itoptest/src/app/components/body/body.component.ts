import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, combineLatestWith, concat, forkJoin, merge, Observable, Subject, take, zip } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { CURRENCIES, Currencies, ICurrency } from 'src/app/types';
//import { CURRENCIES } from '../types';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  currencyOne: FormControl = new FormControl();
  currencyTwo: FormControl = new FormControl();
  currencyOneAmount: FormControl = new FormControl();
  currencyTwoAmount: FormControl = new FormControl();

  currencies: ICurrency[] = Object.values(CURRENCIES);

  //coeficient: Subject<number> = new Subject();
  coeficient: number = 36.65;

  //c$: Observable<any> = new Observable();

  constructor(private currencyService: CurrencyService) {
    // this.currencyOne.setValue(this.currencies[0])
  }
  ngOnInit(): void {
   zip(
      this.currencyOne.valueChanges,
      this.currencyTwo.valueChanges
    ).subscribe(d => console.log(d))

   // this.c$.subscribe(d => console.log(d))
    //this.currencyOne.valueChanges.subscribe(d => console.log(d))
    // this.currencyOne.valueChanges.subscribe(d => console.log(d))
    // this.currencyTwo.valueChanges.subscribe(d => console.log(d))
  }

  setCoeficient() {}

  selectCurrencyOne() {
    this.setAmountTwo();
  }

  selectCurrencyTwo() {
    this.setAmountOne();
  }

  setAmountTwo() {
    const inputAmount = this.currencyOneAmount.value;
    const outputAmount = inputAmount / this.coeficient;
    this.currencyTwoAmount.setValue(outputAmount.toFixed(2));
  }

  setAmountOne() {
    const inputAmount = this.currencyTwoAmount.value;
    const outputAmount = inputAmount * this.coeficient;
    this.currencyOneAmount.setValue(outputAmount.toFixed(2));
  }
}
