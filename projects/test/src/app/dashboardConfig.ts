import { DashboardConfigService, DashboardWidget } from "slDashboard";
import { TemplateConfigComponent } from "./template-config/template-config.component";
import { TemplateComponent } from "./template/template.component";


export const DashWidgetsConf: DashboardWidget[] = [
    new DashboardWidget(TemplateComponent, TemplateConfigComponent, 100, 'xxx', 'Andamento provvigioni', 'Andamento delle provvigioni attive e passive nel tempo', { IdItem: '', BackgroundColor: 'white', IdComponent: 100, Top: 0, Left: 0, width: 4, height: 3, Title: 'Andamento provvigioni', CustomData: {} }),
  ]

   export function InitDashboards(slDashConf: DashboardConfigService) {
     slDashConf.Widgets = DashWidgetsConf;
   }

