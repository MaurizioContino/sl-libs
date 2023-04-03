import { ChangeDetectorRef, Component } from '@angular/core';
import { WidgetConfig } from '../../models/WidgetConfig';
import { Subject, takeUntil } from 'rxjs';
import { DashboardConfigService } from '../../services/dashboard.service';

@Component({
  selector: 'lib-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styles: [
  ]
})
export abstract class DashboardWidgetComponent {


  public Config!: WidgetConfig;
  public destroy$ = new Subject<any>();
  abstract paint(): void;

  //title = "Titolo"
  constructor(protected dashserv: DashboardConfigService,  protected cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
      this.dashserv.ConfigChanges$.pipe(takeUntil(this.destroy$)).subscribe(v=>{
        if (v.IdItem==this.Config.IdItem) this.Config = v;
        this.paint();
        this.cdr.detectChanges();
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }


}
