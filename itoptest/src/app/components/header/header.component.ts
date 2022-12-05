import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usd$: Observable<number> = this.currencyService.getUsdCourse();
  eur$: Observable<number> = this.currencyService.getEurCourse();

  actualDate$: Date = new Date();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getHeaderRates();
  }
}
