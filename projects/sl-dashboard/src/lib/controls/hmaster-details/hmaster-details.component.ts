import { ContentChild, EventEmitter, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Input } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { SlLayoutsService } from '../../services/sl-layouts.service';

@Component({
  selector: 'sl-hmaster-details',
  templateUrl: './hmaster-details.component.html',
  styleUrls: ['./hmaster-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HMasterDetailsComponent implements OnInit, OnDestroy {

  @Input() SelectedDetail: any = null;
  @Output() DetailClosed = new EventEmitter<any>();
  @ContentChild('hmdmaster') master: TemplateRef<any> | null = null;
  @ContentChild('hmddetails') details: TemplateRef<any> | null = null;

  destroy$ = new Subject();

  overlapped = true;
  constructor(private layout: SlLayoutsService){}

  ngOnInit(): void {
    this.layout.currentScreenSize$.pipe(takeUntil(this.destroy$)).subscribe(v=>{

      if (v==='Small' || v==='XSmall' || v==='Medium')
      {
        this.overlapped = true;
      } else {
        this.overlapped = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
  closedetails() {
    this.DetailClosed.emit(this.SelectedDetail);
    this.SelectedDetail = null
  }
}
