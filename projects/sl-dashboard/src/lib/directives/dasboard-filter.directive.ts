/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sl-filter-item]'
})
export class DasboardFilterDirective {


  constructor(public viewContainerRef: ViewContainerRef) { }
}
