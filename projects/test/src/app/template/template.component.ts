
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DashboardWidgetComponent, DashboardConfigService, WidgetConfig } from 'slDashboard';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent extends DashboardWidgetComponent  {


  constructor(dashserv: DashboardConfigService, cdr: ChangeDetectorRef) {
    super(dashserv, cdr);
  }

  override paint(): void {

  }

  // override ngOnInit(): void {
  //   super.ngOnInit();
  // }
  // override ngOnDestroy(): void {
  //   super.ngOnDestroy();
  // }

}
