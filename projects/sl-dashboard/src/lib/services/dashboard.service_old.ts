// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { NgsldbService } from 'ng-sl-db';
// import { Observable, Subject } from 'rxjs';
// import { DashboardDataSource } from '../models/DashboardItem';

// @Injectable({
//   providedIn: 'root'
// })
// export class DashboardConfigService {


//   DataSources: DashboardDataSource[] = [];
//   confServ : any = {}
//   constructor(  private http: HttpClient, private db: NgsldbService) {}

//   GetListDashBoard(): Observable<any[]> {



//     const ret = new Subject<any>();
//     this.http.get<any[]>(this.confServ.DashServiceUrl + `/Dashboards`).subscribe(v=>{
//         ret.next( v);
//     });
//     return ret;
//   }

//   SearchDashBoards(name: string): Observable<any[]> {
//     const ret = new Subject<any>();
//     this.http.get<any[]>(this.confServ.DashServiceUrl + `/Dashboards/search/` + name).subscribe(v=>{
//         ret.next( v);
//     });
//     return ret;
//   }

//   RenameDashBoard(id: string, name: string): Observable<any[]> {
//     const ret = new Subject<any>();
//     this.http.get<any>(this.confServ.DashServiceUrl + `/Dashboards/rename/` + id + "/" + name).subscribe(v=>{
//         ret.next(v);
//     });
//     return ret;
//   }
//   CreateDashBoard(id: string, name: string): Observable<any[]> {
//     const ret = new Subject<any>();
//     this.http.get<any>(this.confServ.DashServiceUrl + `/Dashboards/create/` + name).subscribe(v=>{
//         ret.next(v);
//     });
//     return ret;
//   }
//   ReorderDashBoard(dashboards: any): Observable<any[]> {
//     const ret = new Subject<any>();
//     this.http.post<any>(this.confServ.DashServiceUrl + '/Dashboards/reorder', dashboards).subscribe(v=>{
//         ret.next(v);
//     });
//     return ret;
//   }


//   GetDashBoard(name: string): Observable<any> {
//     const ret = new Subject<any>();
//     this.http.get<any>(this.confServ.DashServiceUrl + `/Dashboards/` + name).subscribe(v=>{
//         ret.next( v);
//     });
//     return ret;
//   }


//   SaveListDashBaord(item: any): Observable<any> {

//     const ret = new Subject<any>();



//     this.http.post<string>(this.confServ.DashServiceUrl + `/Dashboards`, item).subscribe(v=>{
//         ret.next(v);

//     });
//     return ret;


//   }

//   CreateDataSource(ExternalParameters: any) {
//       const ret = new DashboardDataSource(this.http,  null, ExternalParameters);
//       ret.IdData = 0;
//       ret.CacheSec = 120;
//       return ret;
//   }

//   GetDataSourceList(ExternalParameters: any) {
//     const ret = new Subject<any>();
//     this.http.get<any[]>(this.confServ.DashServiceUrl + `/DashboardData`).subscribe(v=>{

//         ret.next(v.map(v=>
//           ({
//             IdData: v.IdData,
//             ds: new DashboardDataSource(this.http, v.Query[0]=="{" ?  JSON.parse(v.Query) : this.moveOldProc(v, ExternalParameters), ExternalParameters),
//             CacheSec: v.CacheSec
//           })
//         ));

//     });
//     return ret;
//   }



//   moveOldProc(ProcOld: any, ExternalFilter: any) {
//     const ds = this.CreateDataSource(ExternalFilter);
//     ds.DataSourceType = 'Store procedure';
//     ds.IdData = ProcOld.IdData;
//     ds.Name = ProcOld.Query;
//     ds.Query = ProcOld.Query;
//     return ds;
//   }



// }
