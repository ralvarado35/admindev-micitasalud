import { appointmentList } from 'src/app/shared/models/models';
import { Component, ViewChild } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { MatTableDataSource } from '@angular/material/table';
import { AnnotationStyle } from 'ng-apexcharts';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss']
})
export class ListAppointmentsComponent {

  public appointmentList: any = [];
  dataSource!: MatTableDataSource<AnnotationStyle>;

  @ViewChild('closebutton') closebutton: any;

  public showFilter = false;
  public searchDataValue = '';
  public specialitie_id = '';
  public date = null;
  public lastIndex = 0;
  public pageSize = 20;
  public totalData = 0;
  public skip = 0; //MIN
  public limit: number = this.pageSize; //MAX
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;


  public appointment_generals: any = [];
  public appointment_selected: any;
  public specialities: any = [];
  public user: any

  constructor(public appointmentService: AppointmentService) {}

  ngOnInit() {
    this.appointmentService.listConfig().subscribe((resp:any) => {
      console.log(resp)
      this.specialities=resp.specialities
    });
    this.getTableData();
    this.user = this.appointmentService.authService.user
  }

  isPermited(){
    let band = false;
    this.user.roles.forEach((rol:any) => {
      if ((rol).toUpperCase().indexOf("DOCTOR") != -1){
        band= true;
      }
    });
    return band;
  }

  isPermision(permission=''){
    if (this.user.roles.includes('Super-Admin')){
      return true;
    }
    if (this.user.permissions.includes(permission)){
      return true;
    }
    return false;
  }




  private getTableData(page=1): void {
    this.appointmentList = [];
    this.serialNumberArray = [];



    this.appointmentService.listAppointments(page, this.searchDataValue, this.specialitie_id, this.date ).subscribe((resp: any) => {
      console.log(resp);

      this.totalData = resp.total;
      this.appointmentList = resp.appointments.data;
      //this.getTableDataGeneral();
      this.dataSource = new MatTableDataSource<any>(this.appointmentList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  getTableDataGeneral() {
    this.appointmentList = [];
    this.serialNumberArray = [];

    this.appointment_generals.map((res: unknown, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {

        this.appointmentList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.appointmentList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  selectAppointment(rol: any) {
    this.appointment_selected = rol;
  }

  deleteAppointment() {
    this.appointmentService
      .deleteAppointment(this.appointment_selected.id)
      .subscribe((resp: any) => {
        console.log(resp);
        const INDEX = this.appointmentList.findIndex(
          (item: any) => item.id == this.appointment_selected.id
        );
        if (INDEX != -1) {
          this.appointmentList.splice(INDEX, 1);
          this.appointment_selected = null;
          this.closebutton.nativeElement.click();
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(){
    //this.dataSource.filter = value.trim().toLowerCase();
    //this.appointmentList = this.dataSource.filteredData;
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  public sortData(sort: any) {
    const data = this.appointmentList.slice();

    if (!sort.active || sort.direction === '') {
      this.appointmentList = data;
    } else {
      this.appointmentList = data.sort((a: unknown, b: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData(this.currentPage);
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData(this.currentPage);
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData(this.currentPage);
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.searchDataValue = '';
    this.specialitie_id= '';
    this.date=null;

    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
      // 1
      // 0-10


    }
  }


}
