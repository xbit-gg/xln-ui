import {
  AfterContentInit,
  AfterViewInit,
  Component, EventEmitter,
  Input, Output
} from '@angular/core';
import {Observable} from "rxjs";
import {ChartConfiguration} from "chart.js";
import Chart from "chart.js/auto";

@Component({
  selector: 'xln-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  @Input()
  id: string;
  @Input()
  chartData: Observable<ChartConfiguration>

  @Output()
  chartLoaded = new EventEmitter<Chart>();

  isLoading: boolean = true;

  constructor() { }

  ngAfterViewInit(): void {
    this.chartData.subscribe(data => {
        const chart = new Chart(this.id, data);
        this.chartLoaded.emit(chart);
        this.isLoading = false;
    });
  }

}
