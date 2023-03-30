
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DashboardConfigService, WidgetConfig } from 'slDashboard';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {
  
  public Config!: WidgetConfig;
  public destroy$ = new Subject<any>();
  //title = "Titolo"
  constructor(private dashserv: DashboardConfigService,  private cdr: ChangeDetectorRef) {
    
  }
  
  ngOnInit(): void {
      this.dashserv.ConfigChanges$.pipe(takeUntil(this.destroy$)).subscribe(v=>{
        if (v.IdItem==this.Config.IdItem) this.Config = v;
        this.cdr.detectChanges();
      })
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }



}
