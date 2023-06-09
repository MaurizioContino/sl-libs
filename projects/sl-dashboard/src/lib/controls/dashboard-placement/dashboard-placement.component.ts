import { JsonPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, TemplateRef } from '@angular/core';

import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';

import { Dashboard } from '../../models/Dashboard';
import { DashboardSize } from '../../models/DashboardSize';
import { DashboardWidget } from '../../models/DashboardWidget';
import { WidgetConfig } from '../../models/WidgetConfig';
import { DashboardConfigService } from '../../services/dashboard.service';
import { SlLayoutsService } from '../../services/sl-layouts.service';

@Component({
    selector: 'sl-dashboard-placement',
    templateUrl: './dashboard-placement.component.html',
    styleUrls: ['./dashboard-placement.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPlacementComponent implements OnInit, AfterViewInit, OnDestroy {
  private _contents: QueryList<TemplateRef<any>> | undefined;

  @Input() editMode = false;
  @Input() dashboard!: Dashboard;
  @Input() Editable = true;
  @Output() ItemClicked =new EventEmitter<any>();
  @Output() SaveConfig =new EventEmitter<any>();
  @Output() DashboardSizeChanged = new EventEmitter<DashboardSize>()

  SavedetailsClass="";
  CanceldetailsClass="";

  @ContentChildren('dashboarditem')
    public get contents(): QueryList<TemplateRef<any>> | undefined {
        return this._contents;
    }
    public set contents(value: QueryList<TemplateRef<any>> | undefined) {
        this._contents = value;
        this.cdr.detectChanges();
    }
    destroy$ = new Subject<any>();
    rows: number[] = [];
    cols: number[] = [];


    get SelectedConfig(): WidgetConfig | undefined {
      const item = this.WidgetIn(this.selectr,this.selectc)?.Config;
      return item;
    }

    set SelectedConfig(value: WidgetConfig | undefined)  {
      if (value) {
        this.setWidgetIn(this.selectr,this.selectc, value);
      }

    }

    get now(): string {
      return Date.now().toString();
    }

    DisplayDetails: true | null = null;
    showSelect = false;
    showConfig = false;
    selectr: number | null = null;
    selectc: number | null = null;
    dsSubscriber: Subscription | undefined;
    constructor(private myElement: ElementRef,
      private cdr: ChangeDetectorRef,private layout: SlLayoutsService,
      private dashserv: DashboardConfigService) {



      }
      ngOnInit(): void {
        console.log("begin dashboard")

        this.dashserv.RefreshRequired$.pipe(takeUntil(this.destroy$)).subscribe(v=>{
          this.cdr.detectChanges();
        });

      }
      ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
      }

    ngAfterViewInit() {
        this.myElement.nativeElement.style = '100%';
        const maxHeight = (this.myElement.nativeElement.offsetWidth - 50) / 50;
        const maxwidth = 40;
        this.dashserv.Size$.next({width: maxwidth, height: maxHeight, item: 50})
        for (let i = 0; i < maxwidth; i++) {
            this.rows.push(i);
        }
        for (let i = 0; i < maxHeight; i++) {
            this.cols.push(i);
        }
        this.DashboardSizeChanged.emit({ElementHeight: 50, ElementWidth: 50, MaxHElement: maxwidth, MaxVElement: maxHeight} as DashboardSize)
        // this.layout.currentScreenSize$.pipe(takeUntil(this.destroy$)).subscribe(v=>{
        //   this.ngAfterViewInit();
        // });
    }
    showadd(idr: number, idc: number) {
        this.DisplayDetails = true;
        this.showSelect = true;
        this.selectc = idc;
        this.selectr = idr;
    }
    closeDetails() {
        this.DisplayDetails = null;
        this.showSelect = false;
        this.showConfig = false;
        this.selectc = null;
        this.selectr = null;
    }

    InitnewWidget(IdComponent: number, x:number=-1, y:number=-1, width: number | null, height: number | null,  datasource: BehaviorSubject<any> | null, customdata: any | null = null) {

      if (x > -1) this.selectc = x;
      if (y > -1) this.selectr = y;

      const model = this.dashserv.Widgets.find((v) => v.IdComponent===IdComponent);

      if (this.dashboard && model && model.component && this.selectr!==null && this.selectc!==null) {
          this.showSelect = false;
          this.DisplayDetails = null;
          const conf = model.cloneConfig();
          conf.IdItem = Date.now().toString();
          conf.Top = this.selectr;
          conf.Left = this.selectc;
          if (width) conf.width = width;
          if (height) conf.height = height;
          if (customdata!=null) conf.CustomData = customdata;


          this.dashboard.Items.push(conf);

         //this.cdr.detectChanges();
      }
    }
    SaveConfigLocal(){

      if (this.SelectedConfig)  {
        this.dashboard.UpdateWidget(this.SelectedConfig);
        this.dashserv.ConfigChange(this.SelectedConfig);
        this.SaveConfig.emit(this.SelectedConfig);
      }
    }
    CancelConfig(){
      this.showConfig = false
      this.showSelect = false;
    }

    WidgetIn(r: number | null, c: number | null): DashboardWidget | null {
      if (this.dashboard && r !=null && c !=null) {
        const config = this.dashboard.getWidgetByPosition(r,c);
        const model = this.dashserv.Widgets.find(v=>v.IdComponent==config?.IdComponent);
        if (model && config) {
          const w = model.clone(config)
          //w.Config = config;
          return w;
        } else {
          return null
        }
      } else {
        return null;
      }
    }
    setWidgetIn(r: number | null, c: number | null, config: WidgetConfig | null) {
      if (this.dashboard && r !=null && c !=null && config) {
        this.dashboard.setWidgetByPosition(r,c, config);
      }
    }
    ConfigIn(r: number, c: number): WidgetConfig | null {
      if (this.dashboard) {
        return this.dashboard.getWidgetByPosition(r,c);
      } else {
        return null;
      }
    }
    copyElement(e: WidgetConfig) {
      const model = this.dashserv.Widgets.find((v) => v.IdComponent===e.IdComponent);

      if (model && this.dashboard) {
          this.showSelect = false;
          this.showConfig = true;
          const c = model.cloneConfig(e)
          c.Top++;
          c.width = e.width;
          c.height = e.height;
          this.dashboard.Items.push(c);
          this.cdr.detectChanges();
      }

    }
    deleteElement(e: WidgetConfig) {
      if (this.dashboard) {
        const idx = this.dashboard.Items.indexOf(e);
        this.dashboard.Items.splice(idx,1)
        this.DisplayDetails = null;
        this.cdr.detectChanges();

      }
    }
    setupElement(e: WidgetConfig) {
      if (this.dashboard) {
        this.selectr = e.Top;
        this.selectc = e.Left;
        this.showConfig = true;
        this.SelectedConfig = e;
        //this.DisplayDetails = true;
      }
      this.cdr.detectChanges();
    }

    emitClick(originalEvent: any, source: WidgetConfig | null){
      this.ItemClicked.emit({source: source, event: originalEvent})
    }


}
