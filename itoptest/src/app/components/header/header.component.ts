import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { ICurrencyEntry } from 'src/app/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usd$: Observable<number> = this.currencyService
    .getUsdCourse()
    .pipe(map((d) => (d.rateBuy + d.rateSell) / 2));
  eur$: Observable<number> = this.currencyService
    .getEurCourse()
    .pipe(map((d) => (d.rateBuy + d.rateSell) / 2));
  actualDate$: Date = new Date();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrency();
    this.currencyService.getCurrency1();
  }
}
