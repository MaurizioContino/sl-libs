import { EventEmitter } from '@angular/core';
import { Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WidgetConfig } from './WidgetConfig';
export class DashboardWidget {


  IdComponent: number;
  Icon: string;
  Name: string;
  Description: string;
  Config: WidgetConfig;
  Data: any;
  DataSource?: BehaviorSubject<any>
  component: Type<any>;
  Configcomponent: Type<any>;
  ItemClick?: EventEmitter<any>;

  constructor(component: Type<any>, configcomponent: Type<any>, IdComponent: number,  Icon: string,  Name: string,  Description: string, CustomData: any) { //, idComponent:number, Name: string, Description: string,  data: unknown) {
    this.component = component;
    this.IdComponent = IdComponent;
    this.Icon = Icon;
    this.Name = Name;
    this.Description = Description;
    this.Config = {IdItem: "0", BackgroundColor: 'white', IdComponent: IdComponent, Top: 0, Left: 0, width: 15, height: 6,dx: 50, dy: 50, Title: Description, CustomData: CustomData }
    this.Configcomponent = configcomponent

  }

  clone(config:  WidgetConfig): DashboardWidget {
    return new DashboardWidget(
      this.component,
      this.Configcomponent,
      this.IdComponent,
      this.Icon,
      this.Name,
      this.Description,
      config
      )

  }
  cloneConfig(e: WidgetConfig | null= null): WidgetConfig{
    if (e)  {
      const w = e.widget;
      e.widget = undefined;
      const ret = JSON.parse(JSON.stringify(e))
      e.widget = w;
      return ret;

    } else {
      const ret = JSON.parse(JSON.stringify(this.Config))
      return ret;
    }
  }
}


