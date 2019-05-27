import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {


  @Input('chartData') doughnutChartData: string[] = [];
  @Input('chartLabels') doughnutChartLabels: number[] = [];
  @Input('chartType') doughnutChartType: string = '';
  @Input('chartColors') doughnutChartColors: string[] = [];



  constructor() { }

  ngOnInit() {
  }

}
