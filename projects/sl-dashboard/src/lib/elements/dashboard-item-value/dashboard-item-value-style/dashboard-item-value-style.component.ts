import { Component, Input } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'sl-dashboard-itemValue-style',
    templateUrl: './dashboard-item-value-style.component.html',
    styleUrls: ['./dashboard-item-value-style.component.scss'],
})
export class DashboardItemValueStyleComponent {
  private _style!: any;
  @Input()
  public get style(): any {
    return this._style;
  }
  public set style(value: any) {
    if (value) {
      if (!value.colors) {
        value.colors = ["direct:black"];
      }
    }
    this._style = value;

  }

  addcolor() {
    this.style.colors.push("direct:black")
  }
}
