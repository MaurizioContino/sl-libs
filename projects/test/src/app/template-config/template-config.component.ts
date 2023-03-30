import { Component, OnInit } from '@angular/core';
import { WidgetConfig } from 'slDashboard';

@Component({
  selector: 'app-template-config',
  templateUrl: './template-config.component.html',
  styles: [
  ]
})
export class TemplateConfigComponent implements OnInit {
  
  Config!: WidgetConfig;

  private _title = "";
  public get title() {
    return this._title;
  }
  public set title(value) {
    this._title = value;
    this.Config.Title = value;
  }

  ngOnInit(): void {
    this._title = this.Config.Title
  }

 



}
