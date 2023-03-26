import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WidgetConfig } from '../../../models/WidgetConfig';

@Component({
    selector: 'sl-dashboard-item-value-config',
    templateUrl: './dashboard-item-value-config.component.html',
    styleUrls: ['./dashboard-item-value-config.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardItemValueConfigComponent {
    @Input() Config: WidgetConfig | undefined;

    @Input() Fields: string[] = []
    methods = ['Primo', 'Ultimo', 'Penultimo', 'Media', 'Massimo', 'Minimo', 'Somma'];

    public get MainField(): string {
        if (this.Config) return this.Config.CustomData['MainField'];
        else return "";
    }
    public set MainField(value: string) {
        if (this.Config) {
            this.Config.CustomData['MainField'] = value;
            this.SecondaryLeftField = value;
            this.SecondaryRightField = value;
        }
    }

    public get SecondaryLeftField(): string  {
        if (this.Config) return this.Config.CustomData['SecondaryLeftField'];
        else return "";
    }
    public set SecondaryLeftField(value: string ) {
        if (this.Config) this.Config.CustomData['SecondaryLeftField'] = value;
    }

    public get SecondaryRightField(): string {
        if (this.Config) return this.Config.CustomData['SecondaryRightField'];
        else return "";
    }
    public set SecondaryRightField(value: string) {
        if (this.Config) this.Config.CustomData['SecondaryRightField'] = value;
    }

    public get MainSelect(): string {
        if (this.Config) return this.Config.CustomData['MainSelect'];
        else return "";
    }
    public set MainSelect(value: string) {
        if (this.Config) this.Config.CustomData['MainSelect'] = value;
    }

    public get SecondaryLeftSelect(): string {
        if (this.Config) return this.Config.CustomData['SecondaryLeftSelect'];
        else return "";
    }
    public set SecondaryLeftSelect(value: string) {
        if (this.Config) this.Config.CustomData['SecondaryLeftSelect'] = value;
    }

    public get SecondaryRightSelect(): string {
        if (this.Config) return this.Config.CustomData['SecondaryRightSelect'];
        else return "";
    }
    public set SecondaryRightSelect(value: string) {
        if (this.Config) this.Config.CustomData['SecondaryRightSelect'] = value;
    }

    public set SecondaryLeftTitle(value: string) {
        if (this.Config) this.Config.CustomData['SecondaryLeftTitle'] = value;
    }

    public set SecondaryRightTitle(value: string) {
        if (this.Config) this.Config.CustomData['SecondaryRightTitle'] = value;
    }

    public get MainStyle(): any | undefined {
      if (this.Config) return this.Config.CustomData['MainStyle'];
      else return "";
    }
    public set MainStyle(value: any | undefined) {
        if (this.Config) this.Config.CustomData['MainStyle'] = value;
    }

    public get LeftStyle(): any | undefined {
      if (this.Config) return this.Config.CustomData['LeftStyle'];
      else return "";
    }
    public set LeftStyle(value: any | undefined) {
        if (this.Config) this.Config.CustomData['LeftStyle'] = value;
    }

    public get RightStyle(): any | undefined {
      if (this.Config) return this.Config.CustomData['RightStyle'];
      else return "";
    }
    public set RightStyle(value: any | undefined) {
        if (this.Config) this.Config.CustomData['RightStyle'] = value;
    }

}
