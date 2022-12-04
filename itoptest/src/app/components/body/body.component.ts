import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, zip } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { CURRENCIES, ICurrency } from 'src/app/types';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

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

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    combineLatest([
      this.currencyOne.valueChanges,
      this.currencyTwo.valueChanges,
    ]).subscribe((curencies: ICurrency[]) => {
      this.rate = this.currencyService.getRate(curencies);
      this.currencyOneAmount.enable();
      this.currencyTwoAmount.enable();
      console.log('combineLatest : ', this.rate)
    });
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
    const outputAmount = inputAmount / this.rate;
    this.currencyTwoAmount.setValue(outputAmount.toFixed(2));
  }

  setAmountOne() {
    const inputAmount = this.currencyTwoAmount.value;
    const outputAmount = inputAmount * this.rate;
    this.currencyOneAmount.setValue(outputAmount.toFixed(2));
  }
}
