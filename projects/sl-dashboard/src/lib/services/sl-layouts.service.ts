import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {Breakpoints} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class SlLayoutsService {

  currLayout: any;
  currentScreenSize$ = new BehaviorSubject<string>("Medium");
  currentLayout$ = new BehaviorSubject<string>("default");

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  constructor() {
  }

  updateSize( query: string ) {
    const SizeName = this.displayNameMap.get(query) ?? 'Medium';
    this.currentScreenSize$.next(SizeName);

  }

  updateLayout(name: string) {
    this.currentLayout$.next(name);
    this.currLayout = name;
  }

}
