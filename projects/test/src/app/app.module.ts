import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardConfigService, SlDashboardModule } from  'slDashboard';
import { TemplateComponent } from './template/template.component';
import { TemplateConfigComponent } from './template-config/template-config.component';
import { InitDashboards } from './dashboardConfig';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    TemplateConfigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SlDashboardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(slDashConf: DashboardConfigService){
    InitDashboards(slDashConf);
}
}
