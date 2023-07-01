
import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input,  Output, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { DasboardItemDirective } from '../../directives/dasboard-item.directive';
import { DashboardWidget } from '../../models/DashboardWidget';
import { WidgetConfig } from '../../models/WidgetConfig';
import { DashboardConfigService } from '../../services/dashboard.service';

@Component({
    selector: 'sl-dashboard-element-panel',
    templateUrl: './dashboard-element-panel.component.html',
    styleUrls: ['./dashboard-element-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardElementPanelComponent implements AfterViewInit, OnDestroy {


    @Input()
    Config!: WidgetConfig;
    ConfigChanged = new BehaviorSubject<WidgetConfig>({} as WidgetConfig);

    @Input() EditMode = false

    @ViewChild(DasboardItemDirective, { static: true }) WidgetHost!: DasboardItemDirective;
    @ViewChild('card') card!: ElementRef<any>;

    @Output() Delete = new EventEmitter<WidgetConfig>()
    @Output() Setup = new EventEmitter<WidgetConfig>()
    @Output() Copy = new EventEmitter<WidgetConfig>()
    @Output() ItemClick = new EventEmitter<any>()

    destroy$ = new Subject<any>();

    DragDeltaWidth = 0;
    DragDeltaHeight = 0;


    get width(): number {
      if (this.Config) {
        const w = this.Config.width > 0 ? this.Config.width : 1;
        return (w * this.Config.dy) + this.DragDeltaWidth - 20; //20 padding
      } else {
        return 100;
      }
    }
    get height(): number {
      if (this.Config) {
        const h = this.Config.height > 0 ? this.Config.height : 1;
        return (h * this.Config.dy) + this.DragDeltaHeight - 20; //20 padding
      } else {
        return 100;
      }

    }
    constructor(private cdr: ChangeDetectorRef, private dashserv: DashboardConfigService) {}



    ngAfterViewInit(): void {
      this.loadComponent();
    }
    ngOnDestroy(): void {
      this.destroy$.next(null);
      this.destroy$.complete();


    }
    componentRef: any = null;
    loadComponent() {
      if (this.WidgetHost && this.WidgetHost.viewContainerRef.length==0) {
        const viewContainerRef = this.WidgetHost.viewContainerRef;
        viewContainerRef.clear();
        if (this.Config) {
          const model = this.dashserv.Widgets.find((v) => v.IdComponent===this.Config?.IdComponent);
          if (model) {
            this.componentRef = viewContainerRef.createComponent<DashboardWidget>(model.component);
            if (this.Config){
              this.Config.dx = 50;
              this.Config.dy = 50;
              this.componentRef.instance.Config = this.Config;

              if (this.componentRef.instance.ItemClick) {

                this.componentRef.instance.ItemClick.pipe(takeUntil(this.destroy$)).subscribe((v: any)=>{
                  this.ItemClick.emit({source:this.Config, value: v});
                })
              }
              if (this.Config.CustomData) {
                Object.keys(this.Config.CustomData).forEach(prop => {
                  (this.componentRef.instance as any)[prop] = this.Config.CustomData[prop];
                });
              }
            }

            this.cdr.detectChanges()
          }
        }
      }
    }


   remove() {
    if (this.Config) this.Delete.emit(this.Config)
   }
   setup() {
    if (this.Config) this.Setup.emit(this.Config);
   }

   copy() {
    if (this.Config) this.Copy.emit(this.Config);
   }

   cdkResizeDragMoved(e: CdkDragMove<any>) {


    this.DragDeltaHeight = e.distance.y;
    this.DragDeltaWidth = e.distance.x;
    e.source.element.nativeElement.style.transform="translate3d(0px,0px," + "0px)"

   }
   cdkResizeDragEnded(e: CdkDragEnd){
    if (this.Config){
      const deltax = Math.round(e.distance.x / this.Config.dx);
      const deltay = Math.round(e.distance.y / this.Config.dx);
      this.Config.height += deltay;
      this.Config.width += deltax;
      this.DragDeltaWidth = 0;
      this.DragDeltaHeight = 0;
      this.componentRef.instance.Config = this.Config;
      this.ConfigChanged.next(this.Config);

    }
   }

   cdkMoveDragMoved(e: CdkDragMove<any>) {
    this.card.nativeElement.style.transform = e.source.element.nativeElement.style.transform;
    e.source.element.nativeElement.style.transform="translate3d(0px,0px," + "0px)"
   }
   cdkMoveDragEnded(e: CdkDragEnd){
    if (this.Config){
      const deltax = Math.round(e.distance.x / this.Config.dx);
      const deltay = Math.round(e.distance.y / this.Config.dy);
      this.Config.Top += deltay;
      this.Config.Left += deltax;

      this.card.nativeElement.style.transform = "translate3d(0px,0px," + "0px)"
      this.ConfigChanged.next(this.Config);
    }
   }

}
