/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sl-dasboard-item]'
})
export class DasboardItemDirective {
  

  constructor(public viewContainerRef: ViewContainerRef) { }
}
