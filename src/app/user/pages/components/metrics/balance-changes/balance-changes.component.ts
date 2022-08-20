import { Component, OnInit } from '@angular/core';
import { XlnMetricsService } from 'src/app/services/xln-metrics.service';
import {map, Observable, of, Subject} from "rxjs";
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'xln-balance-changes',
  templateUrl: './balance-changes.component.html',
  styleUrls: ['./balance-changes.component.scss']
})
export class BalanceChangesComponent implements OnInit {

  chartConfig: ChartConfiguration;
  chartData: Observable<ChartConfiguration>;

  intervals = {
    'day': 14,
    'week': 8,
    'month': 6,
  };
  intervalType: 'day'|'week'|'month' = 'day';

  loading = false;

  private chart: Chart;
  private intervalUpdateTask: any;

  constructor(private xlnMetrics: XlnMetricsService) { }

  ngOnInit(): void {
    this.chartData = this.xlnMetrics.getBalanceChanges(this.intervals[this.intervalType], this.intervalType).pipe(map((balanceChanges) => {
      const keys = Object.keys(balanceChanges);
      this.chartConfig = {
        type: 'bar',
        data: {
          labels: keys,
          datasets: [
            {
              label: 'Net change',
              data: keys.map((key) => balanceChanges[key].net),
              backgroundColor: '#15daa4',
              borderColor: '#15daa4',
              type: 'line',
            },
            {
              label: 'Inflow',
              data: keys.map((key) => balanceChanges[key].inflow),
              backgroundColor: 'rgba(66, 181, 73, 0.25)',
            },
            {
              label: 'Outflow',
              data: keys.map((key) => -balanceChanges[key].outflow),
              backgroundColor: 'rgba(234, 38, 38, 0.25)',
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              type: 'linear'
            },
            x: {
              stacked: true,
              reverse: true,
              ticks: {
                display: true,
              }
            }
          }
        },
      }
      return this.chartConfig;
    }));
  }

  updateChartData(delay: number = 0): void {
    this.loading = true;
    clearTimeout(this.intervalUpdateTask);
    this.intervalUpdateTask = setTimeout(() => {
      this.xlnMetrics.getBalanceChanges(this.intervals[this.intervalType], this.intervalType).subscribe((balanceChanges) => {
        const keys = Object.keys(balanceChanges);
        this.chart.data.labels = keys;
        this.chart.data.datasets[0].data = keys.map((key) => balanceChanges[key].net);
        this.chart.data.datasets[1].data = keys.map((key) => balanceChanges[key].inflow);
        this.chart.data.datasets[2].data = keys.map((key) => -balanceChanges[key].outflow);
        this.chart.update();
        this.loading = false;
      });
    }, delay);
  }

  onChartLoaded(chart: Chart) {
    this.chart = chart;
  }

  setIntervalType(type: 'day'|'week'|'month') {
    this.intervalType = type;
    this.updateChartData();
  }

  decrementIntervals() {
    this.intervals[this.intervalType]--;
    this.updateChartData(250);
  }

  incrementIntervals() {
    this.intervals[this.intervalType]++;
    this.updateChartData(250);
  }

}
