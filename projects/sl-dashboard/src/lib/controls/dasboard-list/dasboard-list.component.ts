import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter,Output } from '@angular/core';
import { DashboardConfigService } from '../../services/dashboard.service';

@Component({
    selector: 'sl-dashboard-item-list',
    templateUrl: './dasboard-list.component.html',
    styleUrls: ['./dasboard-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DasboardListComponent {
    // implements OnInit, OnDestroy {

    @Output() Selected = new EventEmitter<number>();

    GetElemetsAsIDashboard(): any[] {
        return this.dashserv.Widgets.map((v: any)=>{
            return v;
        })
    }

    constructor(private cdr: ChangeDetectorRef, public dashserv: DashboardConfigService) {}
}
