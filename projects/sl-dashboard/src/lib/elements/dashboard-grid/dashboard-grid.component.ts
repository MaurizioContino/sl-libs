/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component,  OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DashboardWidget } from '../../models/DashboardWidget';
import { NoConfigComponent } from '../no-config/no-config.component';

@Component({
    selector: 'sl-dashboard-grid',
    templateUrl: './dashboard-grid.component.html',
    styleUrls: ['./dashboard-grid.component.scss'],
})
export class DashboardGridComponent implements OnDestroy {

  static Definition = new DashboardWidget(DashboardGridComponent, NoConfigComponent, 2, 'xxx', 'Griglia dati', 'Visualizza tutti i dati della dashboard in una griglia',
        { IdItem: 0, BackgroundColor: 'white', IdComponent: 2, Top: 0, Left: 0, width: 20, height: 5, Title: '', CustomData: {} }
    );

    data: any[] = [];
    Fields: string[] = [];

    destroy$ = new Subject<any>();
    private _DataSource!: Subject<any>;
    public get DataSource(): Subject<any> {
      return this._DataSource;
    }
    public set DataSource(value: Subject<any>) {
      this._DataSource = value;
      this.DataSource.pipe(takeUntil(this.destroy$)).subscribe(v=>{
        this.Fields = Object.keys(v);
        this.data = v;
      })
    }


    ngOnDestroy(): void {
      this.destroy$.next(null);
      this.destroy$.complete()
    }

}
