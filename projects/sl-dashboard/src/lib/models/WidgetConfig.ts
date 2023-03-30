import { BehaviorSubject, Subject } from "rxjs";
import { WidgetElement } from "./widgetElement";

export interface WidgetConfig {

    IdItem: string;
    IdComponent: number;
    Top: number;
    Left: number;
    width: number;
    height: number;
    Title: string;
    CustomData: any;
    BackgroundColor: string;
    widget?: WidgetElement;

}
