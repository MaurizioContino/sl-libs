import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Dashboard } from '../models/Dashboard';
import { DashboardWidget } from '../models/DashboardWidget';


@Injectable({
  providedIn: 'root'
})
export class DashboardConfigService {

  store = "Dashboards";
  DashboardGrids: Dashboard[] | null = null;
  DashboardGrids$: Subject<Dashboard[]> = new Subject<Dashboard[]>();
  Size$= new BehaviorSubject<any>(null);
  Widgets: DashboardWidget[] = [];


  calculateColor(colorfuncs: string[], value: number, rightvalues: any): string {
    let ret = "black";
    colorfuncs.forEach(cf => {
      const slices = cf.split(':')
      if (slices[0]=='direct' || slices[0]=='formula') {
        if (slices[0]=='direct') {
          ret = slices[1];
        } else {
          if (this.colorFormula(value, slices[2], slices[3], rightvalues))
          {
            ret = slices[1]
          }

        }
      } else {
        ret = slices[0]
      }
    });
    return ret;
  }

  colorFormula(value: number, comparer: string, rightvalue: string, rightvalues: any): boolean {
    switch(comparer) {
      case "=": {
        if (value===rightvalues[rightvalue]) return true;
        break;
      }
      case ">": {
        if (value > rightvalues[rightvalue]) return true;
        break;
      }
      case "<": {
        if (value < rightvalues[rightvalue]) return true;
        break;
      }
      case ">=": {
        if (value >= rightvalues[rightvalue]) return true;
        break;
      }
      case "<=": {
        if (value <= rightvalues[rightvalue]) return true;
        break;
      }
      case "<>": {
        if (value != rightvalues[rightvalue]) return true;
        break;
      }
      default:
        return false;
    }
    return false
  }

}
