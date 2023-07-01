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

  DashboardGrids: Dashboard[] | null = null;
  DashboardGrids$: Subject<Dashboard[]> = new Subject<Dashboard[]>();
  RefreshRequired$ = new Subject<any>();
  Size$= new BehaviorSubject<any>(null);
  ConfigChanges$= new Subject<WidgetConfig>();
  Widgets: DashboardWidget[] = [];

  constructor() {}

  ConfigChange(config: WidgetConfig) {
    this.ConfigChanges$.next(config);
  }

  refresh() {
    this.RefreshRequired$.next(null);
  }

}
