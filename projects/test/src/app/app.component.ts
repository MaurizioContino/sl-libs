import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Dashboard, DashboardConfigService, DashboardPlacementComponent, DashboardSize, WidgetConfig } from 'slDashboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  current = new Dashboard("default");
    destroy$ = new Subject();
    DashboardSize: DashboardSize | null = null;
    editmode = false;


    @ViewChild('dashboard') dashboardpanel!: DashboardPlacementComponent;


    constructor(private dashboard: DashboardConfigService) {}
    ngOnInit(): void {
      

    }
    SaveConfig(e: WidgetConfig){

        console.log(e);
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
    ngAfterViewInit(): void {
        this.ResetDashboard();
    }
    ResetDashboard() {

        let x = 0;
        let y = 0;
        const mx = this.DashboardSize ? this.DashboardSize.MaxHElement : 20;
        this.dashboardpanel.InitnewWidget(
            100,
            x,
            y,
            20,
            8,
            null,
            { Title: "Andamento provvigioni"}
        );


    }

    SizeChanged(e: any) {
        console.log(e);
    }
    itemclicked(e: any) {}
}
