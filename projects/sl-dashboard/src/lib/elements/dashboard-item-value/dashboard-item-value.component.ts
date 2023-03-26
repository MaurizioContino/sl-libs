import { ChangeDetectionStrategy, ChangeDetectorRef, Component,  Input, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { DashboardWidget } from '../../models/DashboardWidget';
import { WidgetConfig } from '../../models/WidgetConfig';
import { WidgetElement } from '../../models/widgetElement';
import { DashboardConfigService } from '../../services/dashboard.service';
import { DashboardItemValueConfigComponent } from './dashboard-item-value-config/dashboard-item-value-config.component';

@Component({
    selector: 'sl-dashboard-item-value',
    templateUrl: './dashboard-item-value.component.html',
    styleUrls: ['./dashboard-item-value.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardItemValueComponent implements OnInit, OnDestroy, WidgetElement {

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    static Definition = new DashboardWidget(DashboardItemValueComponent, DashboardItemValueConfigComponent, 1, 'xxx', 'Valore singolo', 'Mette in evidenza un singolo valore, un titolo e opzionalmente un secondo valore con un sottotitolo', { IdItem: 0, BackgroundColor: 'white', IdComponent: 1, Top: 0, Left: 0, width: 5, height: 4, Title: '', CustomData: {} });
    private _Config: WidgetConfig | undefined;
    ShowLeft = false
    ShowRight = false

    Data = 0;
    DataLeft = 0;
    DataRight = 0;
    destroy$ = new Subject();

    private _DataSource: Subject<any> | undefined;
    public get DataSource(): Subject<any> | undefined {
      return this._DataSource;
    }
    public set DataSource(value: Subject<any> | undefined) {
      if (value) {
        this._DataSource = value;
        this._DataSource.pipe(takeUntil(this.destroy$)).subscribe(v=>{
          this.Data = v;
        })
      }
    }


    @Input()
  public get Config(): WidgetConfig | undefined {
    return this._Config;
  }
  public set Config(value: WidgetConfig | undefined) {
    this._Config = value;
    if (this._Config){

      this._Config.widget = this as WidgetElement;
    }
  }



    constructor(private cdr: ChangeDetectorRef, private dashserv: DashboardConfigService) {}

    ngOnInit(): void {
      this.Calculate();
    }


    getMainField() {
        return (this.Config as any).CustomData['MainField']
    }
    getLeftField() {
       return (this.Config as any).CustomData['SecondaryLeftTitle']
    }
    getRightField() {
      return (this.Config as any).CustomData['SecondaryRightTitle']
    }

    get mainfieldValuefontSize() : number{
      return this.getStyle("MainStyle", "valuefontsize", 36);
    }
    get mainfieldLabelfontSize(){
      return this.getStyle("MainStyle", "labelfontsize", 36);
    }

    get leftfieldValuefontSize(){
      return this.getStyle("LeftStyle", "valuefontsize", 18);
    }
    get leftfieldLabelfontSize(){
      return this.getStyle("LeftStyle", "labelfontsize", 18);
    }
    get rightfieldValuefontSize(){
      return this.getStyle("RightStyle", "valuefontsize", 18);
    }
    get rightfieldLabelfontSize(){
      return this.getStyle("RightStyle", "labelfontsize", 18);
    }

    get ColorMain(){
      return this.getValueColor("MainStyle", this.Data, {Left: this.DataLeft, Right: this.DataRight});
    }
    get ColorLeft(){
      return this.getValueColor("LeftStyle", this.DataLeft, {Main: this.Data, Right: this.DataRight});
    }
    get ColorRight(){
      return this.getValueColor("RightStyle", this.DataRight, {Left: this.DataLeft, Main: this.Data});
    }

    getValueColor(field: string, value: number, rightValues: any): string {
      if (this.Config) {
        if (this.Config.CustomData && this.Config.CustomData[field]) {
          const style = this.Config.CustomData[field] as any;
          if (style["colors"]) {
            return this.dashserv.calculateColor(style["colors"], value, rightValues);
          } else {
            return "black"
          }
        }
      }
      return "black"
    }

    getStyle(field: string,stylename: string, defaultValue: number): number{
      if (this.Config)
      {
        if (this.Config.CustomData && this.Config.CustomData[field]) {
          const style = this.Config.CustomData[field] as any;
          if (style[stylename]) {
            return style[stylename] as number;
          } else {

            this.Config.CustomData[field][stylename] = defaultValue;
          }
        } else {
          if(this.Config.CustomData) {
            this.Config.CustomData[field] = {}
            this.Config.CustomData[field][stylename] = defaultValue;
          }
        }
      }
      return defaultValue;
    }


    Calculate() {
      if (this.DataSource && this.Config && this.Config.CustomData && this.Config.CustomData['MainField']) {
          this.Data =this.CalculateField(this.Config.CustomData['MainField'], this.Config.CustomData['MainSelect']);
      }

      if (this.DataSource && this.Config && this.Config.CustomData && this.Config.CustomData['SecondaryLeftField']) {
        this.ShowLeft = true;
        this.DataLeft =this.CalculateField(this.Config.CustomData['SecondaryLeftField'], this.Config.CustomData['SecondaryLeftSelect']);
      } else {
        this.ShowLeft = false;
      }
      if (this.DataSource && this.Config && this.Config.CustomData && this.Config.CustomData['SecondaryRightField']) {
        this.ShowRight = true;
        this.DataRight =this.CalculateField(this.Config.CustomData['SecondaryRightField'], this.Config.CustomData['SecondaryRightSelect']);
      } else {
        this.ShowRight = false;
      }
        this.cdr.detectChanges();
    }
    CalculateField(field:string, operator: string): number {
      // if (this.DataSource) {
      //   const recs = this.DataSource.data.map(v=>parseFloat(v[field].toString()));
      //   switch(operator) {
      //     case "Primo":
      //     {
      //       if (recs.length>0) return recs[0];
      //       return 0;
      //     }
      //     case "Ultimo":
      //     {
      //       if (recs.length>0) return recs[recs.length-1]
      //       return 0;
      //     }
      //     case "Penultimo":
      //     {
      //       if (recs.length>1) return recs[recs.length-2]
      //       return 0;
      //     }
      //     case "Media":
      //     {
      //       if (recs.length>0)
      //       {
      //         const sum = recs.reduce((a: number, b: number) => a + b, 0);
      //         return Math.round((sum / recs.length * 100) + Number.EPSILON ) / 100;
      //       } else
      //       return 0;
      //     }
      //     case "Massimo":
      //     {
      //       if (recs.length>0)
      //       {
      //         const x = Math.max(...recs);
      //         return x;
      //       } else
      //       return 0;
      //     }
      //     case "Minimo":
      //     {
      //       if (recs.length>0)
      //       {
      //         return Math.min(...recs);
      //       } else
      //       return 0;
      //     }
      //     case "Somma":
      //     {
      //       return recs.reduce((a: number, b: number) => a + b, 0);
      //     }

      //   }

      // }
      return 0;
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
