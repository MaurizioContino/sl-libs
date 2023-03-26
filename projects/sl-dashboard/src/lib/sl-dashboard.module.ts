import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardPlacementComponent } from './controls/dashboard-placement/dashboard-placement.component';
import { DashboardElementComponent } from './controls/dashboard-element/dashboard-element.component';
import { DashboardElementPanelComponent } from './controls/dashboard-element-panel/dashboard-element-panel.component';
import { DasboardListComponent } from './controls/dasboard-list/dasboard-list.component';
import { DasboardItemDirective } from './directives/dasboard-item.directive';
import { NoConfigComponent } from './elements/no-config/no-config.component';
import { HMasterDetailsComponent } from './controls/hmaster-details/hmaster-details.component';
import { SlSmallHeaderComponent } from './controls/sl-small-header/sl-small-header.component';



@NgModule({
  declarations: [
    HMasterDetailsComponent,
    SlSmallHeaderComponent,
    DashboardPlacementComponent,
    DashboardElementComponent,
    DashboardElementPanelComponent,
    DasboardListComponent,
    DasboardItemDirective,
    NoConfigComponent,
  ],
  imports: [
    CommonModule, FormsModule, DragDropModule, NgScrollbarModule,
  ],
  exports: [
    DashboardPlacementComponent,
    DashboardElementComponent,
    DashboardElementPanelComponent,
    DasboardListComponent,
    DasboardItemDirective,
    NoConfigComponent,
  ]
})
export class SlDashboardModule { }
