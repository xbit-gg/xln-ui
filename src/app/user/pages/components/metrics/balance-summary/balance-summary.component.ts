import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {ChartConfiguration} from "chart.js";
import {map, Observable, of, Subject} from "rxjs";
import {WalletBalance, XlnMetricsService} from "../../../../../services/xln-metrics.service";
import {SatPipe} from "../../../../../pipes/sat.pipe";

@Component({
  selector: 'xln-balance-summary',
  templateUrl: './balance-summary.component.html',
  styleUrls: ['./balance-summary.component.scss']
})
export class BalanceSummaryComponent implements OnInit {

  totalBalance: string = '0';
  chartConfig: ChartConfiguration;
  chartData: Observable<ChartConfiguration>;

  displayLogScale = false;
  displayZeroBalances = false;

  private chart: Chart;
  private allBalances: WalletBalance[];
  private nonzeroBalances: WalletBalance[];

  constructor(private xlnMetrics: XlnMetricsService) { }

  ngOnInit(): void {
      this.chartData = this.xlnMetrics.getBalanceSummary().pipe(map((balanceSummary) => {
        this.totalBalance = balanceSummary.totalBalance;
        this.allBalances = balanceSummary.walletBalances.sort((a, b) => {
          const x = this.xlnMetrics.satStringToInteger(a.balance);
          const y = this.xlnMetrics.satStringToInteger(b.balance);
          return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
        this.nonzeroBalances = this.allBalances.filter(walBal => walBal.balance !== '0');
        this.chartConfig = {
          type: 'bar',
          data: {
            labels: this.nonzeroBalances.map(walBal => walBal.name),
            datasets: [{
              label: 'Wallet balances',
              data: this.nonzeroBalances.map(walBal => this.xlnMetrics.satStringToInteger(walBal.balance)),
              backgroundColor: '#15daa4',
            }],
          },
          options: {
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                type: 'linear'
              },
              y: {
                ticks: {
                  display: this.nonzeroBalances.length <= 10,
                }
              }
            }
          },
        }
        return this.chartConfig;
      }));
  }

  onChartLoaded(chart: Chart) {
    this.chart = chart;
  }

  onLogScaleToggle() {
    this.displayLogScale = !this.displayLogScale;
    // @ts-ignore
    this.chart.options.scales['x'].type = this.displayLogScale ? 'logarithmic' : 'linear';
    this.chart.update();
  }

  onEmptyToggle() {
    this.displayZeroBalances = !this.displayZeroBalances;
    const bals = this.displayZeroBalances ? this.allBalances : this.nonzeroBalances;
    this.chart.data.labels = bals.map(walBal => walBal.name);
    this.chart.data.datasets[0].data = bals.map(walBal => this.xlnMetrics.satStringToInteger(walBal.balance));
    this.chart.update();
  }
}
