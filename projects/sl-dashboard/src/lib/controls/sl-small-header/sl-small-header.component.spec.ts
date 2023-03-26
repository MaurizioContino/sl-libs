import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlBigHeaderComponent } from './sl-big-header.component';

describe('SlBigHeaderComponent', () => {
  let component: SlBigHeaderComponent;
  let fixture: ComponentFixture<SlBigHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlBigHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlBigHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
