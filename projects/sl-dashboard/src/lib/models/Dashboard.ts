
import { WidgetConfig } from './WidgetConfig';

export class Dashboard  {
    isnew = false;
    updated = '';
    originalupdated = '';
    deleted = false;
    Id = 0;
    Name = '';
    Description = '';


    Items: WidgetConfig[] = [];



    getWidgetByPosition(r: number, c: number): WidgetConfig | null {
        const itm = this.Items.find((w) => w.Top===r && w.Left===c);
        if (itm) return itm;
        else return null;
    }

    public fromJson(data: string) {
        const deserialized = JSON.parse(data) as Dashboard;
        if (deserialized.Items) {
            //this.Items = deserialized.Items.map(v=>  DashboardItem.fromItem(v));
        }
        if (this.Items===undefined || this.Items===null) this.initializeNewDashboard();

        this.Items = deserialized.Items ? deserialized.Items : [];
        this.Name = deserialized.Name;
        this.Description = deserialized.Description;
    }

    public fromObject(data: Dashboard) {
        this.isnew = data.isnew;
        this.updated = data.updated;
        this.originalupdated = data.originalupdated;
        this.deleted = data.deleted;
        this.Id = data.Id;
        this.Items = data.Items ? data.Items : [];
        this.Name = data.Name;
        this.Description = data.Description;

        for (let idx = 0; idx < this.Items.length; idx++) {
            //this.Items[idx] = DashboardItem.fromItem(this.Items[idx]);
        }
    }

    initializeNewDashboard() {
        this.Items = [];
        this.isnew = true;
    }

    public AddControl(top: number, left: number, width: number, height: number) {
        // this.max = 0;
        // this.Items.forEach(v=>{
        //   if (v.idComponent > this.max) this.max = v.idComponent;
        // });
        // this.max += 1;
        // const itm = new DashboardItem(top, left, height, width);
        // itm.IdItem = this.max;
        // this.Items.push(itm)
        // return itm;
    }

    RemoveControlByID(id: number) {
        // if (this.Items)  {
        //   const v = this.Items.find(v=>v.IdItem===id)
        //   if (v) {
        //     const idx = this.Items.indexOf(v);
        //     this.Items.splice(idx,1);
        //   }
        // }
    }

    public findByPosition(row: number, col: number) {
        // if (this.Items && this.Items.length>0) {
        //   const res = this.Items.filter(v=>v.top==row && v.left==col);
        //   if (res.length>0) {
        //     return res
        //   } else {
        //     return [];
        //   }
        // } else {
        //   return [];
        // }
    }
    public findById(id: number) {
        // const res = this.Items.filter(v=>v.IdItem===id);
        // if (res.length>0) {
        //   return res[0]
        // } else {
        //   return [];
        // }
    }
}
