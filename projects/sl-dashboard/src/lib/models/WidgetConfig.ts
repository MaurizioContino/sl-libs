import { BehaviorSubject, Subject } from "rxjs";
import { WidgetElement } from "./widgetElement";

export interface WidgetConfig {

    IdItem: number;
    IdComponent: number;
    Top: number;
    Left: number;
    width: number;
    height: number;
    Title: string;
    CustomData: any;
    DataSource?: BehaviorSubject<any>;
    BackgroundColor: string;
    widget?: WidgetElement;

}
