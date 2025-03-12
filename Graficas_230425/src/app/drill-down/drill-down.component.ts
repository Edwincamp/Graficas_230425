import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsDrilldown from 'highcharts/modules/drilldown';

HighchartsDrilldown(Highcharts); // Solo necesitamos el módulo de drilldown

@Component({
  selector: 'app-drill-down',
  templateUrl: './drill-down.component.html',
  styleUrls: ['./drill-down.component.scss']
})
export class DrillDownComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = true;
  oneToOne = true;  // Asegura una actualización más precisa
  
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      events: {
        drilldown: function(e: Highcharts.DrilldownEventObject): void {
          if (!e.seriesOptions) {
            const chart = this as Highcharts.Chart;
            chart.showLoading('Cargando datos...');
          }
        }
      },
      height: 400
    },
    title: {
      text: 'Navegación Drill Down'
    },
    subtitle: {
      text: 'Click en las columnas para ver más detalles'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Total'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}'
        }
      }
    },
    series: [{
      name: 'Categorías',
      colorByPoint: true,
      type: 'column',
      data: [
        { name: 'Animales', y: 5, drilldown: 'animales' },
        { name: 'Frutas', y: 6, drilldown: 'frutas' },
        { name: 'Autos', y: 4, drilldown: 'autos' }
      ]
    }] as Highcharts.SeriesOptionsType[],
    credits: {
      enabled: false
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    drilldown: {
      animation: {
        duration: 500
      },
      breadcrumbs: {
        position: {
          align: 'left'
        }
      },
      activeDataLabelStyle: {
        color: '#FFFFFF',
        textDecoration: 'none',
        textOutline: '1px #000000'
      },
      series: [
        {
          id: 'animales',
          type: 'column',
          name: 'Animales',
          data: [
            ['Perros', 4],
            ['Gatos', 2],
            ['Pájaros', 1]
          ]
        },
        {
          id: 'frutas',
          type: 'column',
          name: 'Frutas',
          data: [
            ['Manzanas', 2],
            ['Naranjas', 3],
            ['Plátanos', 1]
          ]
        },
        {
          id: 'autos',
          type: 'column',
          name: 'Autos',
          data: [
            ['Toyota', 2],
            ['Honda', 1],
            ['Ford', 1]
          ]
        }
      ] as Highcharts.SeriesOptionsType[]
    }
  };

  constructor() {
    // Verificar que el módulo esté cargado al instanciar
    if (typeof Highcharts === 'object') {
      HighchartsDrilldown(Highcharts);
    }
  }

  ngOnInit(): void {
    // Verificación del módulo drilldown
    if (!this.Highcharts.Chart.prototype.drilldown) {
      console.warn('Reinicializando módulo drilldown');
      HighchartsDrilldown(Highcharts);
    }
    
    // Asegurarse de que las opciones son válidas
    if (!this.chartOptions.series || !this.chartOptions.drilldown) {
      console.error('Configuración de series o drilldown incorrecta');
      return;
    }
  }
}