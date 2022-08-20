import { Component, OnInit } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { map, Observable } from 'rxjs';
import { XlnMetricsService } from 'src/app/services/xln-metrics.service';

@Component({
  selector: 'xln-transactions-summary',
  templateUrl: './transactions-summary.component.html',
  styleUrls: ['./transactions-summary.component.scss']
})
export class TransactionsSummaryComponent implements OnInit {

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
    this.chartData = this.xlnMetrics.getTransactionVolumes(this.intervals[this.intervalType], this.intervalType).pipe(map((txVolumes) => {
      const keys = Object.keys(txVolumes);
      this.chartConfig = {
        type: 'bar',
        data: {
          labels: keys,
          datasets: [
            {
              label: 'Volume',
              data: keys.map((key) => txVolumes[key].volume),
              backgroundColor: '#15daa4',
              borderColor: '#15daa4',
              type: 'line',
              yAxisID: 'y',
            },
            {
              label: 'Count',
              data: keys.map((key) => txVolumes[key].count),
              backgroundColor: 'rgba(21, 218, 164, 0.25)',
              yAxisID: 'y1',
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
            y1: {
              position: 'right'
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
      this.xlnMetrics.getTransactionVolumes(this.intervals[this.intervalType], this.intervalType).subscribe((txVolumes) => {
        const keys = Object.keys(txVolumes);
        this.chart.data.labels = keys;
        this.chart.data.datasets[0].data = keys.map((key) => txVolumes[key].volume);
        this.chart.data.datasets[1].data = keys.map((key) => txVolumes[key].count);
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
