import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { CURRENCIES, ICurrency } from 'src/app/types';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit, OnDestroy {
  currencyOne: FormControl = new FormControl();
  currencyTwo: FormControl = new FormControl();
  currencyOneAmount: FormControl = new FormControl({
    value: null,
    disabled: true,
  });
  currencyTwoAmount: FormControl = new FormControl({
    value: null,
    disabled: true,
  });

  currencies: ICurrency[] = Object.values(CURRENCIES);

  rate: number = -1;

  destroy$: Subject<any> = new Subject<any>();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    combineLatest([
      this.currencyOne.valueChanges,
      this.currencyTwo.valueChanges,
    ]).subscribe((curencies: ICurrency[]) => {
      this.currencyService
        .getRate(curencies)
        .pipe(takeUntil(this.destroy$))
        .subscribe((rate: number) => {
          this.rate = rate;
          this.setAmountTwo(rate);
        });
      this.currencyOneAmount.enable();
      this.currencyTwoAmount.enable();
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  selectAmountOne() {
    this.setAmountTwo(this.rate);
  }

  selectAmountTwo() {
    this.setAmountOne(this.rate);
  }

  setAmountTwo(rate: number) {
    const inputAmount = this.currencyOneAmount.value;
    const outputAmount = inputAmount * rate;
    this.currencyTwoAmount.setValue(outputAmount.toFixed(2));
  }

  setAmountOne(rate: number) {
    const inputAmount = this.currencyTwoAmount.value;
    const outputAmount = inputAmount / rate;
    this.currencyOneAmount.setValue(outputAmount.toFixed(2));
  }
}
