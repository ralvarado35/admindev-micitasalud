import { Component, OnInit, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexYAxis,

} from 'ng-apexcharts';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/shared/data/data.service';
import { recentPatients, upcomingAppointments } from 'src/app/shared/models/models';
import { DashboardService } from '../service/dashboard.service';
export type ChartOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: ApexAxisChartSeries | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: ApexChart | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLabels: ApexDataLabels | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plotOptions: ApexPlotOptions | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsive: ApexResponsive[] | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xaxis: ApexXAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: ApexLegend | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fill: ApexFill | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: ApexGrid | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stroke: ApexStroke | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

export type ChartOptionsTwo = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: ApexAxisChartSeries | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: ApexChart | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xaxis: ApexXAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLabels: ApexDataLabels | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: ApexGrid | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fill: ApexFill | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markers: ApexMarkers | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yaxis: ApexYAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stroke: ApexStroke | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: ApexTitleSubtitle | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsive: ApexResponsive[] | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plotOptions: ApexPlotOptions | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip: ApexTooltip | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: ApexLegend | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

interface data {
  value: string ;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  public routes = routes;
  public selectedValue = '2024';
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptionsOne: Partial<ChartOptions>;
  public chartOptionsOneTwo:  Partial<ChartOptionsTwo>;
  public chartOptionsTwo: Partial<ChartOptions>;

  public recentPatients: Array<recentPatients> = [];
  public upcomingAppointments: Array<upcomingAppointments> = [];

  appointments:any = [];

  public num_appointment_current=0;
  public num_appointment_before=0;
  public porcentaje_d=0;

  num_patients_current=0;
  num_patients_before=0;
  porcentaje_dp=0;

  num_attention_current=0;
  num_attention_before=0;
  porcentaje_da=0;

  num_appointment_total_current=0;
  num_appointment_total_before=0;
  porcentaje_dt=0;

  query_patients_by_gender:any = [];
  query_patients_speciality:any = [];
  query_patients_speciality_porcentaje:any=[];
  query_income_year:any=[];

  user:any;

  constructor(public data : DataService, public dashBoardService: DashboardService) {

    this.chartOptionsOne = {
      chart: {
        height: 230,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        },

      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false
           }
         },
        yaxis: {
          lines: {
            show: true
           }
         },
        },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      series: [
        {
          name: 'Male',
          color: '#2E37A4',
          data: [],
        },
        {
          name: 'Female',
          color: '#00D3C7',
          data: [],
        },
      ],
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
          axisBorder: {
            show: false, // set to false to hide the vertical gridlines
          },
        },
    };

    this.chartOptionsTwo = {
      series: [],
      labels: [],
      chart: {
        type: 'donut',
        height: 200,
        width: 200,
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false
      },
      plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '50%'
        },
    },
      dataLabels: {
        enabled: false,
      },
      responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
              show: false
            }
        }
    }],
    };

    this.chartOptionsOneTwo = {
      chart: {
        height: 200,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false
           }
         },
        yaxis: {
          lines: {
            show: true
           }
         },
        },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'Ingresos',
          color: '#2E37A4',
          data: [] //[45, 60, 75, 51, 42, 42, 30],
        },
      ],
      xaxis: {
        categories: [] //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
    };

    this.recentPatients = this.data.recentPatients;
    this.upcomingAppointments = this.data.upcomingAppointments;

  }
  ngOnInit(): void {
    this.user = this.dashBoardService.authService.user;
    if (this.user.roles.includes("Super-Admin") || this.user.permissions.includes("admin_dashboard")){
      this.dashBoardService.dashboardAdmin({}).subscribe((resp:any) => {
        console.log(resp);
        this.appointments= resp.appointments.data

        this.num_appointment_current= resp.num_appointment_current
        this.num_appointment_before= resp.num_appointment_before
        this.porcentaje_d= resp.porcentaje_d

        this.num_patients_current= resp.num_patients_current
        this.num_patients_before= resp.num_patients_before
        this.porcentaje_dp= resp.porcentaje_dp

        this.num_attention_current= resp.num_attention_current
        this.num_attention_before= resp.num_attention_before
        this.porcentaje_da= resp.porcentaje_da

        this.num_appointment_total_current= resp.num_appointment_total_current
        this.num_appointment_total_before= resp.num_appointment_total_before
        this.porcentaje_dt= resp.porcentaje_dt

      });
      this.dashboardAdminYear();
    }
  }

  public sortData(sort: Sort) {
    const data = this.recentPatients.slice();
    const datas = this.upcomingAppointments.slice();

    if (!sort.active || sort.direction === '') {
      this.recentPatients = data;
      this.upcomingAppointments = datas;

    } else {
      this.recentPatients = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
      this.upcomingAppointments = datas.sort((a, b) => {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

   dashboardAdminYear(){

    const data = {
      year: this.selectedValue

    }
    this.query_income_year=null;

    this.dashBoardService.dashboardAdminYear(data).subscribe((resp:any) => {

      console.log(resp)

      this.query_patients_by_gender = resp.query_patients_by_gender;

      const data_male:any = [];
      const data_female:any = [];

      // START
      this.query_patients_by_gender.forEach((item:any) => {
        data_male.push(item.hombre)
        data_female.push(item.mujer)
      });

      const Patient_by_Genders = [
        {
          name: 'Hombre',
          color: '#2E37A4',
          data: data_male,
        },
        {
          name: 'Mujer',
          color: '#00D3C7',
          data: data_female,
        },
      ];
      this.chartOptionsOne.series = Patient_by_Genders
      // END

      // START
      this.query_patients_speciality = resp.query_patients_speciality;
      const labels_spe: any[] = [];
      const series_spe: any[] = [];
      this.query_patients_speciality.forEach((patient_specility: any) => {
        labels_spe.push(patient_specility.name);
        series_spe.push(patient_specility.count)

      })

      this.chartOptionsTwo.labels = labels_spe
      this.chartOptionsTwo.series = series_spe
      // END

      this.query_patients_speciality_porcentaje = resp.query_patients_speciality_porcentaje

      this.query_income_year = resp.query_income_year
      const data_income:any = [];
      this.query_income_year.forEach((element:any) => {
        data_income.push(element.income)
      });

      this.chartOptionsOneTwo = {
        chart: {
          height: 200,
          type: 'line',
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false
             }
           },
          yaxis: {
            lines: {
              show: true
             }
           },
          },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        series: [
          {
            name: 'Ingresos',
            color: '#2E37A4',
            data: data_income,
          }
        ],
        xaxis: {
          categories: resp.months_name //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
      };


      // this.chartOptionsOneTwo.series = [
      //   {
      //     name: 'Ingresos',
      //     color: '#2E37A4',
      //     data: data_income,
      //   }
      // ]
      // this.chartOptionsOneTwo.xaxis.categories = resp.months_name

    })

  }

  selectedYear(){
    console.log(this.selectedValue);
    this.dashboardAdminYear();

  }

  selecedList: data[] = [
    {value: '2023'},
    {value: '2024'},
    {value: '2025'},
    {value: '2026'},
  ];
}
