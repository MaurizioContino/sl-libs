import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Dashboard } from '../models/Dashboard';
import { DashboardWidget } from '../models/DashboardWidget';
import { WidgetConfig } from '../models/WidgetConfig';




@Injectable({
  providedIn: 'root'
})

export class DashboardConfigService {

  store = "Dashboards";
  DashboardGrids: Dashboard[] | null = null;
  DashboardGrids$: Subject<Dashboard[]> = new Subject<Dashboard[]>();
  Size$= new BehaviorSubject<any>(null);
  ConfigChanges$= new Subject<WidgetConfig>();
  Widgets: DashboardWidget[] = [];


  //DataSources: DashboardDataSource[] = [];
  confServ : any = {}

  constructor(  private http: HttpClient) {}

  ConfigChange(config: WidgetConfig) {
    this.ConfigChanges$.next(config);
  }

  GetListDashBoard(): Observable<any[]> {

    const ret = new Subject<any>();
    this.http.get<any[]>(this.confServ.DashServiceUrl + `/Dashboards`).subscribe((v: any[])=>{
        ret.next( v);
    });
    return ret;
  }

  SearchDashBoards(name: string): Observable<any[]> {
    const ret = new Subject<any>();
    this.http.get<any[]>(this.confServ.DashServiceUrl + `/Dashboards/search/` + name).subscribe((v: any[])=>{
        ret.next( v);
    });
    return ret;
  }

  RenameDashBoard(id: string, name: string): Observable<any[]> {
    const ret = new Subject<any>();
    this.http.get<any>(this.confServ.DashServiceUrl + `/Dashboards/rename/` + id + "/" + name).subscribe((v: any[])=>{
        ret.next(v);
    });
    return ret;
  }
  CreateDashBoard(id: string, name: string): Observable<any[]> {
    const ret = new Subject<any>();
    this.http.get<any>(this.confServ.DashServiceUrl + `/Dashboards/create/` + name).subscribe((v: any[])=>{
        ret.next(v);
    });
    return ret;
  }
  ReorderDashBoard(dashboards: any): Observable<any[]> {
    const ret = new Subject<any>();
    this.http.post<any>(this.confServ.DashServiceUrl + '/Dashboards/reorder', dashboards).subscribe((v: any[])=>{
        ret.next(v);
    });
    return ret;
  }


  GetDashBoard(name: string): Observable<any> {
    const ret = new Subject<any>();
    this.http.get<any>(this.confServ.DashServiceUrl + `/Dashboards/` + name).subscribe((v: any[])=>{
        ret.next( v);
    });
    return ret;
  }

  SaveListDashBaord(item: any): Observable<any> {

    const ret = new Subject<any>();
    this.http.post<string>(this.confServ.DashServiceUrl + `/Dashboards`, item).subscribe((v: string)=>{
        ret.next(v);

    });
    return ret;
  }




}
