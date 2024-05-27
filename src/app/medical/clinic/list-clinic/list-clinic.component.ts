import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnnotationStyle } from 'ng-apexcharts';
import { RolesService } from '../../roles/service/roles.service';
import { ClinicService } from '../service/clinic.service';

@Component({
  selector: 'app-list-clinic',
  templateUrl: './list-clinic.component.html',
  styleUrls: ['./list-clinic.component.scss']
})
export class ListClinicComponent {
  public clinicList: any = [];
  dataSource!: MatTableDataSource<AnnotationStyle>;

  @ViewChild('closebutton') closebutton: any;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0; //MIN
  public limit: number = this.pageSize; //MAX
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;

  public clinic_generals: any = [];
  public clinic_selected: any;

  public user:any;

  constructor(public clinicService: ClinicService) {}
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.user = this.clinicService.authService.user
    this.getTableData();
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

  private getTableData(): void {
   // this.clinicList = [];
    this.serialNumberArray = [];

    this.getTableDataGeneral();

    this.clinicService.listClinics().subscribe((resp: any) => {
      console.log(resp);

      this.totalData = resp.clinics.data.length;
      this.clinic_generals = resp.clinics.data;
      this.getTableDataGeneral(); 
    });
  }

  getTableDataGeneral() {
    this.clinicList = [];
    this.serialNumberArray = [];

    this.clinic_generals.map((res: unknown, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.clinicList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.clinicList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  selectClinic(rol: any) {
    this.clinic_selected = rol;
  }

  // deleteRol() {
  //   this.clinicService
  //     .deleteClinic(this.clinic_selected.id)
  //     .subscribe((resp: any) => {
  //       console.log(resp);
  //       const INDEX = this.clinicList.findIndex(
  //         (item: any) => item.id == this.clinic_selected.id
  //       );
  //       if (INDEX != -1) {
  //         this.clinicList.splice(INDEX, 1);
  //         this.clinic_selected = null;
  //         this.closebutton.nativeElement.click();
  //       }
  //     });
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.clinicList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.clinicList.slice();

    if (!sort.active || sort.direction === '') {
      this.clinicList = data;
    } else {
      this.clinicList = data.sort((a: unknown, b: unknown) => {
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
      this.getTableDataGeneral();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
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
    this.getTableDataGeneral();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.searchDataValue = '';
    this.getTableDataGeneral();
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
    }
  }
}
